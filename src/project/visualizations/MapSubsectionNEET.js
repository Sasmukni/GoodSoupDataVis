import HeatMap from "./Heatmap";
import DonutChart from "./DonutChart";
import GroupedBarChart from "./GroupedBarChart";
import DumbbellPlot from "./DumbbellPlot";

import {useState} from "react";
import GaugeChart from "./GaugeChart";
import SlopeChart from "./SlopeChart";
export default function MapSubsectionNEET({
    data = [{"year":2013,"nation":"Austria","tot_students":422780,"tot_students_perc":1.3689668384,"tot_females":225938,"tot_females_perc":53.4410331615,"tot_males":196842,"tot_males_perc":46.5589668385,"tot_full_time":422780,"tot_full_time_perc":100.0,"tot_part_time":0,"tot_part_time_perc":0.0,"tot_public_sector":355966,"tot_public_sector_perc":84.1965088226,"tot_private_sector":66814,"tot_private_sector_perc":15.8034911774,"tot_private_gov_dep_sector":0,"tot_private_gov_dep_sector_perc":0.0,"tot_private_gov_ind_sector":0,"tot_private_gov_ind_sector_perc":0.0,"tot_short_cycle_type":76801,"tot_short_cycle_type_perc":18.1657126638,"tot_bachelor_type":180234,"tot_bachelor_type_perc":42.6306826245,"tot_master_type":140087,"tot_master_type_perc":33.1347272813,"tot_doctoral_type":25658,"tot_doctoral_type_perc":6.0688774303,"fem_short_cycle_type":41240,"fem_bachelor_type":95686,"fem_master_type":76918,"fem_doctoral_type":12094,"male_short_cycle_type":35561,"male_bachelor_type":84548,"male_master_type":63169,"male_doctoral_type":13564,"fem_full_time":225938,"fem_part_time":0,"male_full_time":196842,"male_part_time":0,"fem_public_sector":190467,"fem_private_sector":35471,"fem_private_gov_dep_sector":0,"fem_private_gov_ind_sector":0,"male_public_sector":165499,"male_private_sector":31343,"male_private_gov_dep_sector":0,"male_private_gov_ind_sector":0}],
    nation= null,
    year = null,
    width= 10,
    colors = {}
})
{
    const [category, setCategory] = useState("Donut");

    var dataForGauge = data? data.map(d => ({data:[{male:d.tot_males, female:d.tot_females}]})):null;
   
    return (
        
    <div>
        <h3>{nation}</h3>
        {data.length?
        <>
        {/*<div>
            <button onClick={() => setCategory("Gauge")}>Male/Female</button>
            <button onClick={() => setCategory("Slope")}>Years</button>
        </div>*/}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", margin: "20px 0" }}>
            <button
                style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "background-color 0.3s, transform 0.2s",
                }}
                onClick={() => setCategory("Gauge")}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
                Male/Female
            </button>
            <button
                style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "background-color 0.3s, transform 0.2s",
                }}
                onClick={() => setCategory("Slope")}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
                Years
            </button>
        </div>
        {dataForGauge.length && category === "Gauge" &&
            <GaugeChart data={dataForGauge[0].data[0]} width={width-30} colors={colors}/>
        }
        {category === "Slope" && nation && year &&
            <SlopeChart selectedNation={nation} leftYear={year-1} rightYear={year} width={width-30} colors={colors}/>
        }
        </>
        :
        <div>
            No data for this nation
        </div>
        }
    </div>
);
}