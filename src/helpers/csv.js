import { exportFile } from "quasar";

export default {
  exportTable(data, columns, fileName) {
    // naive encoding to csv format
    const content = [columns.map((col) => wrapCsvValue(col.label))]
      .concat(
        data.map((row) =>
          columns
            .map((col) =>
              wrapCsvValue(
                typeof col.label === "Ações"
                  ? col.field(row)
                  : row[col.field === void 0 ? col.name : col.field],
                col.format,
                row
              )
            )
            .join(",")
        )
      )
      .join("\r\n");

    const status = exportFile(`${fileName}.csv`, "\ufeff" + content, "text/csv");

    if (status !== true) {
      $q.notify({
        message: "Não foi possível baixar o arquivo...",
        color: "negative",
        icon: "warning",
      });
    }
  },
};

const wrapCsvValue = (val, formatFn) => {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')
  return `"${formatted}"`;
};
