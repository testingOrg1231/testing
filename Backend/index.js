const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

const ical = require("node-ical");

const getIcalDate = async () => {
  try {
    const webEvents = await ical.async.fromURL(
      "https://api.beds24.com/ical/bookings.ics?roomid=351115"
    );

    let listDate = [];

    for (let k in webEvents) {
      if (webEvents.hasOwnProperty(k)) {
        const ev = webEvents[k];
        if (webEvents[k].type == "VEVENT") {
          var startDate = ev.start.toISOString().split("T")[0];
          var endDate = ev.end.toISOString().split("T")[0];
          var dateMove = new Date(startDate);
          var strDate = startDate;

          while (strDate < endDate) {
            var strDate = dateMove.toISOString().slice(0, 10);
            listDate.push(strDate);
            dateMove.setDate(dateMove.getDate() + 1);
          }
        }
      }
    }
    return listDate;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const response = await getIcalDate();
    res.send(JSON.stringify(response));
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
