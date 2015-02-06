/**
 * QwiController
 */

module.exports = {

  quarterly_total_employment: function (req, res) {
    if (!req.body['county_ids']) {
      res.send('{ status: "ERROR: Must send county id(s)"}', 500);
      return;
    }

    var counties = req.body['county_ids']
                      .reduce(function(pre, cur, i) { return pre += (i ? ", '" : "'") + cur + "'"; }, '')

    var sql = '\n' +
      "SELECT year, quarter, geography AS county, SUM(emp) AS total_employment \n" + //TODO: ??? Rename geography to county ???
      "FROM qwi \n" +
      "WHERE (geography IN (" + counties + ")) \n" +
      "GROUP BY year, quarter, geography;";

    Qwi.query(sql, {}, function (error, data) {
      if (error) {
        res.send('{ status: "error:' + error + '"}', 500);
        return;
      } else res.json(data.rows);  
    });

  },

  quarterly_total_employment_view: function (req, res) {
    res.view({});
  }

}

