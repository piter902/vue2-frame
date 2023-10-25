<template>
  <tuns-pro-table
    ref="queryTable"
    :options="options"
    :filters="filters"
    :dictData="dictData"
    :tableData.sync="tableData"
    @selectChange="selectChange"
  >
    <template #slotKey_table="{ row, rowIndex, column }">
      <span>{{ row.partnerName }} - {{ rowIndex }} - {{ column.width }}</span>
    </template>
  </tuns-pro-table>
</template>

<script>
export default {
  name: 'new_check_out_bill',
  data() {
    return {
      tableData: [],
      selectData: [],
      dictData: {
        timeType: [
          {
            value: '2',
            label: '签单日期'
          },
          {
            value: '6',
            label: '投保日期'
          },
          {
            value: '1',
            label: '起保日期'
          },
          {
            value: '3',
            label: '审核日期'
          },
          {
            value: '7',
            label: '保单支付日期'
          },
          {
            value: '5',
            label: '报价日期'
          },
          {
            value: '4',
            label: '保单创建时间'
          }
        ]
      },
      filters: {},
      options: {
        // 查询配置
        searchSetting: {
          showBtn: true,
          showMore: true,
          colSpan: 6,
          configType: 'new_check_out_bill::filterForm'
        },
        // 查询表单配置
        formList: [
          {
            prop: 'departArr',
            label: '分支机构',
            slot: true,
            slotName: 't-cascader',
            dictName: 'departArr',
            props: {
              't-initOptions': 'newDepart',
              labelKey: 'departName',
              valueKey: 'departCode',
              't-select-all': true, // 是否显示全选
              't-formatKeys': {
                departCode: 'departCodes'
              }
            }
          },
          {
            label: '支付状态',
            prop: 'status',
            component: 'select',
            dictName: 'payment_status',
            props: {
              't-getOptions': 'payment_status'
            }
          },
          {
            label: '账单批次号',
            prop: 'batchNumber',
            component: 'input'
          },
          {
            label: '账单创建开始时间',
            prop: 'startTm',
            component: 'date',
            props: {
              type: 'datetime',
              format: 'yyyy-MM-dd HH:mm:ss',
              'value-format': 'yyyy-MM-dd HH:mm:ss'
            }
          },
          {
            label: '账单创建结束时间',
            prop: 'endTm',
            component: 'date',
            props: {
              type: 'datetime',
              format: 'yyyy-MM-dd HH:mm:ss',
              'value-format': 'yyyy-MM-dd HH:mm:ss'
            }
          }
        ],
        // 查询服务配置
        query: {
          url: '/tuns-finance/financesettlement/BranchAndDivisionBearBill/pageList' // 请求函数参数
        },
        // 表格配置
        tableSetting: {
          tableRef: '',
          loading: false,
          useVirtual: true,
          type: ['checkbox', 'seq'],
          configType: 'new_check_out_bill', // 表格自定义配置
          // 表格外按钮
          toolbar: [
            {
              text: '创建账单',
              type: 'primary',
              fun: this.getTableData
            },
            {
              text: '线下支付',
              type: 'primary',
              fun: this.getTableData
            },
            {
              text: '批量支付',
              type: 'primary',
              fun: this.getTableData
            },
            {
              text: '导入支付',
              type: 'primary',
              fun: this.getTableData
            },
            {
              text: '撤销账单',
              type: 'danger',
              fun: this.getTableData
            },
            {
              text: '导出总表',
              type: 'primary',
              fun: this.getTableData
            },
            {
              text: '导出明细(机构)',
              type: 'primary',
              fun: this.getTableData
            },
            {
              text: '导出明细(总部)',
              type: 'primary',
              fun: this.getTableData
            }
          ]
          // 表格内操作列
          //   operWidth: '280px',
          //   operator: []
        },
        // 表格 统计配置
        totalSetting: {
          hasHandelComputed: true,
          mapData: {
            policyCommTotal: '',
            departCommTotal: '',
            nextDepartCommTotal: ''
          }
        },
        // 表格 列配置
        columns: [
          {
            prop: 'batchNumber',
            label: '账单批次号',
            width: '180px',
            render: (text, row) => {
              return <span style="color: rgb(64, 158, 255)">{row.batchNumber}</span>;
            }
          },
          {
            prop: 'departName',
            label: '分支机构',
            width: '180px'
          },
          {
            prop: 'timeType',
            label: '时间类型',
            width: '150px',
            dictName: 'timeType'
          },
          {
            prop: 'startTm',
            label: '账单开始时间',
            width: '150px'
          },
          {
            prop: 'endTm',
            label: '账单结束时间',
            width: '150px'
          },
          {
            prop: 'fromTypeNameListStr',
            label: '保单类型',
            width: '120px'
          },
          {
            prop: 'policyCommTotal',
            label: '保单佣金总额',
            width: '150px'
          },
          {
            prop: 'departCommTotal',
            label: '本机构佣金总额',
            width: '150px'
          },
          {
            prop: 'nextDepartCommTotal',
            label: '下级机构佣金总额',
            width: '150px'
          },
          {
            prop: 'status',
            label: '支付状态',
            width: '100px',
            dictName: 'payment_status'
          },
          {
            prop: 'payTm',
            label: '支付时间',
            width: '150px'
          },
          {
            prop: 'creTm',
            label: '创建账单日期',
            width: '150px'
          },
          {
            prop: 'creUserName',
            label: '创建人',
            width: '150px'
          }
        ],
        page: {
          pageSize: 40,
          page: 1
        }
      }
    };
  },
  created() {},
  methods: {
    getData() {},
    /**
     * 获取表格数据
     * @param {*} data
     */
    getTableData(data) {
      //   const { tableData, selectData, dictData } = data;
      console.log('data', data);
      console.log('getTableData', this.tableData);
      alert(`当前表一共有${this.tableData.length}条数据`);
    },
    /**
     * 获取选中的表格数据
     */
    getSelectData() {
      console.log(this.selectData);
      alert(`选中了${this.selectData.length}条数据`);
    },
    selectChange(data) {
      this.selectData = data;
    },
    changeRow2(data) {
      console.log('data', data);
      data.forEach((item) => {
        item.sex = '0';
      });
    },
    add(row, index, data) {
      console.log(row, index, data);
    },
    del(row) {
      alert(`点击了删除,删除了合作伙伴为"${row.partnerName}"的一条数据`);
    },
    woshishabi(row) {
      alert(row.departName);
    }
  }
};
</script>
