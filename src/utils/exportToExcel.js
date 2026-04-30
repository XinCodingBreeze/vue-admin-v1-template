import FileSaver from "file-saver";
import * as XLSX from "xlsx-js-style";



/**
 * 生成 Excel 列名 (A, B, ..., Z, AA, AB, ...)
 * @param {number} colCount 列数
 * @returns {string[]}
 */
const getColumnNames = (colCount) => {
    const cols = [];
    for (let i = 0; i < colCount; i++) {
        let name = '';
        let n = i;
        do {
            name = String.fromCharCode(65 + (n % 26)) + name;
            n = Math.floor(n / 26) - 1;
        } while (n >= 0);
        cols.push(name);
    }
    return cols;
};

/**
 * 为表格添加样式
 * @param {*} ws 工作表
 * @param {*} WbLength  表格行数
 */
const addStyle = (ws, WbLength) => {
    const range = ws['!ref'];
    if (!range) return;
    const decoded = XLSX.utils.decode_range(range);
    const colCount = decoded.e.c + 1;
    const arr = getColumnNames(colCount);

    for (let i = 0; i <= WbLength; i++) {
        arr.forEach((item) => {
            // 从B列开始
            let str = item + (i + 1).toString(); // 其他列的单元格位置
            if (!ws[str]) return;

            // 仅对第一行设置样式
            if (i === 0) {
                ws[str].s = {
                    font: {
                        name: "宋体",
                        sz: 12,
                        bold: true,
                    },
                    fill: {
                        patternType: "solid",
                        fgColor: { rgb: "FFFF00" },
                    }, // 设置背景颜色
                    alignment: {
                        horizontal: "center",
                        vertical: "center",
                        indent: 0,

                    },
                };
            } else {
                ws[str].s = {
                    font: {
                        name: "宋体",
                        sz: 12,
                    },
                    border: {
                        top: { style: "thin", color: { auto: 1 } },
                        left: { style: "thin", color: { auto: 1 } },
                        right: { style: "thin", color: { auto: 1 } },
                        bottom: { style: "thin", color: { auto: 1 } },
                    },
                    alignment: {
                        horizontal: "center",
                        vertical: "center",
                        indent: 0,
                        wrapText: true, // 自动换行
                    },
                };
            }
        });
    }
};


/**
 * 移除不需要的列
 * @param {*} tableDom 表格 DOM
 */
// 定义一个函数，用于移除表格中不需要的列
const removeUnwantedColumns = (tableDom) => {
    // 获取表格头部
    let tableHeader = tableDom.querySelector('.el-table__header-wrapper');
    // 获取头部中的所有列
    let headerDom = tableHeader.childNodes[0].querySelectorAll('th');

    // 如果第一列中有复选框，则移除第一列
    if (headerDom[0].querySelectorAll('.el-checkbox').length > 0) {
        headerDom[0].remove();
    }
    // 移除表格内容中的复选框
    let tableBody = tableDom.querySelector('.el-table__body');
    // 获取表格内容中的所有列
    let bodyDom = tableBody.querySelectorAll('td');
    // 遍历每一列
    bodyDom.forEach((td) => {
        // 如果列中有复选框，则移除该列
        if (td.querySelector('.el-checkbox')) {
            td.remove();
        }
    });
};


/**
 * 导出
 * @param {*} element 导出表格的id或数组
 * @param {*} WbLength 导出表格个数
 * @param {*} name 导出文件名
 * @returns
 */
const exportToExcel = async (element, WbLength = 999, name = '导出文件',) => {
    let _min = 99;
    const wb = XLSX.utils.book_new();
    const xlsxParam = { raw: true };

    if (typeof element === "string") {
        let ele = document.getElementById(element)
        // 克隆一个节点，防止表格数据变化
        let tableDom = ele.cloneNode(true);

        // 移除不需要的列
        removeUnwantedColumns(tableDom);
        // 导出表格，此时已删除复选框
        const ws = XLSX.utils.table_to_sheet(
            tableDom,
            xlsxParam
        );

        if (ws) {
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            addStyle(ws, WbLength); // 添加样式
        }


    } else {
        // 遍历导出多个表格
        element.forEach((item) => {
            const ws = XLSX.utils.table_to_sheet(
                document.getElementById(item.eleById),
                xlsxParam
            );
            XLSX.utils.book_append_sheet(wb, ws, item.title);
            addStyle(ws, WbLength); // 为每个工作表添加样式
        });
    }

    // 设置表格宽度
    if (wb.Sheets.Sheet1) {
        wb.Sheets.Sheet1["!cols"] = [];
        wb.Sheets.Sheet1["!rows"] = [];
        for (let i = 0; i < _min; i++) {
            if (i === 0) {
                wb.Sheets.Sheet1["!rows"].push({ hpx: 30 });
            }
            wb.Sheets.Sheet1["!cols"].push({ wpx: 150 });
        }
    }

    // 导出excel文件名
    const fileName = `${name + '-' + new Date().getTime()}.xlsx`;

    const wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
    });
    try {
        // 下载保存文件
        FileSaver.saveAs(
            new Blob([wbout], { type: "application/octet-stream" }),
            fileName
        );
    } catch (e) {
        console.error(e);
    }
    return wbout;
};

export default exportToExcel;
