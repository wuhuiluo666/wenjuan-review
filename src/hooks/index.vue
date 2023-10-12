<template>
  <div v-clickoutside="close" class="el-autocomplete" aria-haspopup="listbox" role="combobox"
    :aria-expanded="suggestionVisible" :aria-owns="id">
    <el-input ref="result" v-bind="[$attrs]" v-model="resultText" :size="size" :placeholder="placeholder"
      :clearable="clearable" @blur="handleBlur" @focus="handleFocus" @clear="handleClear">
      <template v-if="$slots.prepend" slot="prepend">
        <slot name="prepend" />
      </template>
      <template v-if="$slots.append" slot="append">
        <slot name="append" />
      </template>
      <template v-if="$slots.prefix" slot="prefix">
        <slot name="prefix" />
      </template>
      <template v-if="$slots.suffix" slot="suffix">
        <slot name="suffix" />
      </template>
    </el-input>

    <AutoinputSuggestions :id="id" ref="suggestions" visible-arrow :class="[popperClass]" :popper-options="popperOptions"
      :append-to-body="popperAppendToBody" :placement="placement">
      <div v-if="singleSearch" style="padding: 3px;">
        <el-input ref="input" v-model="keyInput" type="text" auto-complete="off" placeholder="请输入" @input="handleChange"
          @keydown.native="handleFilt" @keydown.up.native.prevent="highlight(highlightedIndex - 1, true)"
          @keydown.down.native.prevent="highlight(highlightedIndex + 1, true)" @keydown.esc.native="close"
          @keydown.native.tab="close" />
      </div>
      <el-row v-else :gutter="10" style="padding: 3px; z-index: 3000">
        <el-col :span="6">
          <!--
          <el-input
            v-model="keyInput"
            auto-complete="off"
            readonly="readonly"
            :placeholder="holderOptions.find((o) => o.value == inputType).label"
            @focus="$refs.input.focus()"
          />
          -->

          <el-input ref="input" v-model="keyInput" type="text" auto-complete="off"
            :placeholder="holderOptions.find((o) => o.value == inputType).label" @input="handleChange"
            @keydown.native="handleFilt" @keyup.native="handleFormat"
            @keydown.up.native.prevent="highlight(highlightedIndex - 1, true)"
            @keydown.down.native.prevent="highlight(highlightedIndex + 1, true)" @keydown.enter.native="handleKeyEnter"
            @keydown.space.native="handleKeyEnter" @keydown.esc.native="close" @keydown.native.tab="close" />
        </el-col>
        <el-col :span="10">
          <el-input v-model="highlightedText" disabled @click.native.stop="$refs.input.focus()" />
        </el-col>
        <el-col :span="4">
          <el-select v-model="inputType" :popper-append-to-body="false" placeholder="输入法" @change="handleChange"
            @visible-change="$refs.input.focus()">
            <el-option v-for="item in inputOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="matchType" :popper-append-to-body="false" placeholder="模式"
            @visible-change="$refs.input.focus()" @change="handleChange">
            <el-option v-for="item in matchOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-table ref="table" highlight-current-row stripe border max-height="250" :data="suggestions"
          @header-click="handleHeaderClick" @row-click="handleRowClick" @row-dblclick="handleRowDbClick($event, true)"
          @selection-change="multipleSelection = $event">
          <el-table-column v-if="multiple" type="selection" width="40" />

          <el-table-column v-for="(
              { columnName, columnLabel, columnWidth, dict }, index
            ) in tableColumns" :key="index" :label="columnLabel" :prop="columnName"
            :formatter="dict ? useDictFormatter(dict) : null" :min-width="columnWidth">
            <template slot-scope="scope">
              <span>{{ scope.row[columnName] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </AutoinputSuggestions>
  </div>
</template>
<script>
import debounce from "throttle-debounce/debounce";
import Clickoutside from "element-ui/src/utils/clickoutside";
import AutoinputSuggestions from "./autoinput-suggestions";
import Emitter from "element-ui/src/mixins/emitter";
import { generateId } from "element-ui/src/utils/util";

export default {
  name: "AutoInput",
  components: {
    AutoinputSuggestions,
  },
  directives: { Clickoutside },
  mixins: [Emitter],
  inheritAttrs: false,
  componentName: "AutoInput",
  props: {
    valueKey: {
      //Value的字段名
      type: String,
      default: "id",
    },
    labelKey: {
      //Label的字段名
      type: String,
      default: "name",
    },
    tableColumns: {
      //数据表字段定义{columnName,columnLabel,columnWidth}
      type: Array,
      required: true,
    },
    remoteMethod: {
      type: Function, //远程调用获取数据表数据
      required: true,
    },
    remoteWhenNone: {
      //输入为空的的时候是否允许查询
      type: Boolean,
      default: true,
    },
    cleanWhenSelected: {
      type: Boolean, // 当选择数据后清空input内容
      default: true,
    },
    cleanOutInput: {
      type: Boolean, // 当选择数据后清空最外部input内容
      default: false,
    },
    multiple: {
      type: Boolean, //是否多选
      default: false,
    },
    placeholder: {
      type: String,
      default: "拼音/五笔",
    },
    size: {
      type: String,
      default: "mini",
    },
    value: {
      type: [String, Number, Array], //v-model的值
      default: "",
    },
    defalutResultText: {
      type: String, //默认结果文本
      default: "",
    },
    triggerOnFocus: {
      //弹出时是否马上触发查询,为false的时候,查询值为空时不触发查询操作
      type: Boolean,
      default: true,
    },
    selectWhenUnmatched: {
      //是否可以选中空选项(重置为空值)
      type: Boolean,
      default: true,
    },
    debounce: {
      //抖动时间
      type: Number,
      default: 300,
    },
    hideLoading: Boolean, //是否隐藏loading状态
    placement: {
      //弹出框位置 top/top-start/top-end/bottom/bottom-start/bottom-end
      type: String,
      default: "bottom-start",
    },
    popperWidth: {
      //弹出框宽度
      type: Number,
      default: 500,
    },
    popperClass: {
      type: String, //弹出框class
      default: "",
    },
    popperOptions: {
      type: Object, //弹出框options
      default: () => ({}),
    },
    popperAppendToBody: {
      //弹出框是否嵌入body
      type: Boolean,
      default: true,
    },
    highlightFirstItem: {
      //是否默认选中第一个选项
      type: Boolean,
      default: true,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    initText: {
      //默认选项文本
      type: String,
      default: "",
    },
    initKeyInput: {
      //默认搜索框数据
      type: String,
      default: "",
    },
    singleSearch: {
      //单纯搜索框
      type: Boolean,
      default: false,
    },
    isEdit: { //是否为编辑状态，编辑的时候用户数据回显,为true时，监听到value变化，会请求配置，过滤出对应的选项
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // type: 'text', //  @focus="type = 'password'"
      activated: false,
      suggestions: [],
      multipleSelection: [], //表格checkbox多选
      loading: false,
      selectWhenLoaded: false, //加载后直接select第一条
      suggestionDisabled: false,
      highlightedIndex: -1, //高亮的index
      highlightedText: "", //高亮的文本
      resultText: this.initText, //结果文本
      keyInput: "", //输入字符(password)
      keyInputView: "", //输入字符展示
      inputType: "1",
      matchType: "0",
      inputOptions: [
        { value: "1", label: "拼音" },
        { value: "2", label: "五笔" },
        { value: "0", label: "名称" },
      ],
      holderOptions: [
        { value: "1", label: "拼音首码" },
        { value: "2", label: "五笔首码" },
        { value: "0", label: "名称输入" },
      ],
      matchOptions: [
        { value: "0", label: "前后" },
        { value: "1", label: "完全" },
      ]
    };
  },
  computed: {
    suggestionVisible() {
      return this.activated;
    },
    id() {
      return `el-autoinput-${generateId()}`;
    },
  },
  watch: {
    suggestionVisible(val) {
      this.broadcast("AutoinputSuggestions", "visible", [
        val,
        this.popperWidth,
      ]);
      this.$emit("close", val);
    },
    value(val) {
      //resetForm的时候重置
      console.log("val",val)
      if (!val) {
        this.resultText = "";
        this.keyInput = "";
        this.highlightedText = "";
        this.suggestions = [];
      }else if (this.isEdit){
        this.getData({
          keyword: this.keyInput.toLowerCase(),
          matchType: this.matchType,
          inputType: this.inputType,
        })
      }
    },
    initText(text) {
      this.resultText = text;
    },
    initKeyInput: {
      handler(val) {
        this.keyInput = val;
      },
      immediate: true,
    },
    multipleSelection(items) {
      if (this.multiple && this.activated) {
        this.resultText = (items || []).map((o) => o[this.labelKey]).join(",");
        let vs = (items || []).map((o) => o[this.valueKey]);
        this.$emit("input", vs);
        this.$emit("select", items);
      }
    },
  },
  mounted() {
    if(this.value){
      // 用于数据回显，针对一些挂载时就有初始值不会出发watch的value回显处理
      this.getData({
        keyword: this.keyInput.toLowerCase(),
        matchType: this.matchType,
        inputType: this.inputType,
      })
    }
    this.dom = this.$refs['table'].bodyWrapper;
    this.dom.addEventListener("scroll", this.debounceFn(() => {
      let scrollTop = this.dom.scrollTop;
      let windowHeight = this.dom.clientHeight || this.dom.clientHeight;
      let scrollHeight = this.dom.scrollHeight || this.dom.scrollHeight;
      if (Math.abs(scrollTop + windowHeight - scrollHeight) < 3) {
        if (scrollTop > 0) {
          this.$emit("scrollBottomClick", scrollHeight);
        }
      }
    }, 1000));
    this.debouncedGetData = debounce(this.debounce, this.getData);
    let $input = this.getInput();
    $input.setAttribute("role", "textbox");
    $input.setAttribute("aria-controls", "id");
    $input.setAttribute(
      "aria-activedescendant",
      `${this.id}-item-${this.highlightedIndex}`
    );
    
  },
  beforeDestroy() {
    this.$refs.suggestions.$destroy();
  },
  methods: {
    debounceFn(fn, wait) {
      let timeout = null;
      wait = wait || 600;
      return function () {
        let that = this;
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(() => {
          fn.apply(that);
        }, wait);
      };
    },
    getData(tempQuery) {
      let query = {
        ...tempQuery
      }
      if(query.focusSearch){
       delete query.focusSearch
      }
      if (this.suggestionDisabled) {
        return;
      }

      this.loading = true;
      this.remoteMethod(query, (suggestions, type) => {
        this.loading = false;
        if (this.suggestionDisabled) {
          return;
        }

        if (Array.isArray(suggestions)) {
          if (type === 'replace') {
            this.suggestions = suggestions
          } else {
            this.suggestions = this.suggestions.concat(suggestions);
          }
          if (this.selectWhenLoaded) {
            this.selectWhenLoaded = false;
            this.highlightedIndex = 0;
            this.highlight(this.highlightedIndex);
            this.select(this.suggestions[this.highlightedIndex]);
            return;
          }
          this.highlightedIndex = this.highlightFirstItem ? 0 : -1;
          if (this.value) {
            this.highlightedIndex = this.suggestions
              .map((item) => item[this.valueKey])
              .indexOf(this.value);
              console.log(this.value)
              console.log("highlightedIndex",this.highlightedIndex, this.suggestions)
            if (this.isEdit && !tempQuery.focusSearch) {
              this.handleRowDbClick(this.suggestions[this.highlightedIndex])
            }
          }

          if (this.suggestions?.length == 1) this.highlightedIndex = 0;
          this.highlight(this.highlightedIndex);
        } else {
          console.error(
            "[Element Error][Autoinput]autoinput suggestions must be an array"
          );
        }
      });
    },
    handleChange() {
      if (!this.remoteWhenNone && !this.keyInput) {
        this.$nextTick(() => {
          this.suggestions = [];
          this.highlightedIndex = -1;
          this.highlightedText = "";
        });

        return;
      }

      this.suggestionDisabled = false;
      this.loading = true;
      this.debouncedGetData({
        keyword: this.keyInput.toLowerCase(),
        matchType: this.matchType,
        inputType: this.inputType,
        focusSearch:true
      });
    },
    handleFocus() {
      this.activated = true;
      this.$refs.input.focus();
      if (!this.remoteWhenNone && !this.keyInput) {
        return;
      }

      if (this.triggerOnFocus && this.suggestions.length == 0) {
        this.debouncedGetData({
          keyword: this.keyInput.toLowerCase(),
          matchType: this.matchType,
          inputType: this.inputType,
          focusSearch:true
        });
      }
    },
    handleBlur(event) {
      this.$emit("blur", event);
    },
    handleClear() {
      this.close();
      this.$emit("input", null);
      this.$emit("select", null);
    },
    cleanAutoInput() {
      this.keyInput = "";
      this.highlightedText = "";
      this.suggestions = [];
      if (this.cleanOutInput) this.resultText = "";
    },
    close() {
      this.activated = false;
      this.cleanAutoInput();
    },
    handleFilt(event) {
      //过滤输入字符
      var isCharNumberOrDelete =
        (48 <= event.keyCode && event.keyCode <= 90) ||
        (96 <= event.keyCode && event.keyCode <= 105) ||
        event.keyCode == 8;

      if (this.inputType != "0" && !isCharNumberOrDelete) {
        event.returnValue = false;
      }
    },
    handleFormat(event) {
      event.target.value = event.target.value.toLowerCase();
      if (this.inputType !== "0") {
        var reg = /[^a-z0-9]/g;
        event.target.value = event.target.value.replace(reg, "");
      }
    },
    handleKeyEnter(e) {
      if (
        this.suggestionVisible &&
        this.highlightedIndex >= 0 &&
        this.highlightedIndex < this.suggestions.length
      ) {
        e.preventDefault();
        e.stopPropagation();
        if (this.loading) {
          this.selectWhenLoaded = true;
          this.activated = false;
        } else {
          this.select(this.suggestions[this.highlightedIndex]);
        }
      } else if (
        this.suggestionVisible &&
        this.highlightedIndex == -1 &&
        this.selectWhenUnmatched
      ) {
        e.preventDefault();
        e.stopPropagation();
        let item = {};
        item[this.valueKey] = "";
        this.select(item);
      } else if (
        this.suggestionVisible &&
        this.highlightedIndex == -1 &&
        !this.selectWhenUnmatched
      ) {
        this.$message({
          message: "不允许选择空选项",
          type: "warning",
        });
      }
    },
    select(item) {
      this.resultText = item[this.labelKey];
      console.log(this.valueKey)
      this.$emit("input", item[this.valueKey]);
      this.$emit("select", item);

      this.$nextTick(() => {
        this.activated = false; //隐藏而不清空状态
        if (this.cleanWhenSelected) this.cleanAutoInput();
      });
    },
    handleRowDbClick(row) {
      this.select(row);
    },
    handleRowClick(row) {
      let index = this.suggestions.indexOf(row);
      this.highlight(index, false);
      this.$refs.input.focus();
    },
    handleHeaderClick() {
      this.$refs.table.bodyWrapper.scrollTop = 0;
      this.$refs.input.focus();
    },
    highlight(index, autoScroll) {
      if (!this.suggestionVisible || this.loading) {
        return;
      }
      if (index < 0) {
        this.highlightedIndex = -1;
        this.highlightedText = "";
        this.$refs.table.setCurrentRow(null);
        return;
      }

      if (index >= this.suggestions.length) {
        index = this.suggestions.length - 1;
      }

      let item = this.suggestions[index];
      this.$refs.table.setCurrentRow(item);

      if (autoScroll) {
        let rowHeight =
          this.$refs.table.$el.querySelector("tr.el-table__row").clientHeight;
        let scrollTop = this.$refs.table.bodyWrapper.scrollTop;
        let scrollHeight = this.$refs.table.bodyWrapper.scrollHeight;
        let gap = rowHeight * (index + 1) - scrollTop;
        if (gap > 200) {
          scrollTop += rowHeight;
        } else if (gap > 0) {
          scrollTop -= rowHeight;
        } else {
          scrollTop = rowHeight * index;
        }

        if (scrollTop > scrollHeight) {
          scrollTop = scrollHeight;
        } else if (scrollTop < 0) {
          scrollTop = 0;
        }

        this.$refs.table.bodyWrapper.scrollTop = scrollTop;
      }

      this.highlightedIndex = index;
      this.highlightedText = item ? item[this.labelKey] : "";
      let $input = this.getInput();
      $input.setAttribute(
        "aria-activedescendant",
        `${this.id}-item-${this.highlightedIndex}`
      );
    },
    getInput() {
      return this.$refs.result.getInput();
    },
    useDictFormatter(dictType) {
      //数据表:字典
      if (!dictType) {
        return null;
      }

      let $this = this;
      return function (row, column, cellValue) {
        return $this.dictFormat(cellValue, dictType);
      };
    },
  },
};
</script>

<style
  lang="scss"
  scoped
>
::v-deep .el-table__row:hover {
  cursor: pointer;
}

.passowrd {
  position: absolute;
  top: 1px;
  width: auto;

  ::v-deep .el-input__inner {
    border: 0;
    background: none;
    opacity: 0;
  }
}
</style>
