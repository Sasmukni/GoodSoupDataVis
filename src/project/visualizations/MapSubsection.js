import HeatMap from "./Heatmap";
import DonutChart from "./DonutChart";
import GroupedBarChart from "./GroupedBarChart";

export default function MapSubsection({
    data = [{"year":2013,"nation":"Austria","tot_students":422780,"tot_students_perc":1.3689668384,"tot_females":225938,"tot_females_perc":53.4410331615,"tot_males":196842,"tot_males_perc":46.5589668385,"tot_full_time":422780,"tot_full_time_perc":100.0,"tot_part_time":0,"tot_part_time_perc":0.0,"tot_public_sector":355966,"tot_public_sector_perc":84.1965088226,"tot_private_sector":66814,"tot_private_sector_perc":15.8034911774,"tot_private_gov_dep_sector":0,"tot_private_gov_dep_sector_perc":0.0,"tot_private_gov_ind_sector":0,"tot_private_gov_ind_sector_perc":0.0,"tot_short_cycle_type":76801,"tot_short_cycle_type_perc":18.1657126638,"tot_bachelor_type":180234,"tot_bachelor_type_perc":42.6306826245,"tot_master_type":140087,"tot_master_type_perc":33.1347272813,"tot_doctoral_type":25658,"tot_doctoral_type_perc":6.0688774303,"fem_short_cycle_type":41240,"fem_bachelor_type":95686,"fem_master_type":76918,"fem_doctoral_type":12094,"male_short_cycle_type":35561,"male_bachelor_type":84548,"male_master_type":63169,"male_doctoral_type":13564,"fem_full_time":225938,"fem_part_time":0,"male_full_time":196842,"male_part_time":0,"fem_public_sector":190467,"fem_private_sector":35471,"fem_private_gov_dep_sector":0,"fem_private_gov_ind_sector":0,"male_public_sector":165499,"male_private_sector":31343,"male_private_gov_dep_sector":0,"male_private_gov_ind_sector":0}],
    nation= null
})
{
    var dataForDonut = data? data.map(d => ({data:[{label:"Female",value:d.tot_females},{label:"Male",value:d.tot_males}]})):null;
    var dataForGroupedBarChart = data? data.map(d => ({
        data: [
            {level:"Short Cycle", group:"Female", value: d.fem_short_cycle_type},
            {level:"Short Cycle", group:"Male", value: d.male_short_cycle_type},
            {level:"Bachelor", group:"Female", value: d.fem_bachelor_type},
            {level:"Bachelor", group:"Male", value: d.male_bachelor_type},
            {level:"Master", group:"Female", value: d.fem_master_type},
            {level:"Master", group:"Male", value: d.male_master_type},
            {level:"Doctoral", group:"Female", value: d.fem_doctoral_type},
            {level:"Doctoral", group:"Male", value: d.male_doctoral_type}
        ]
    })): null;

    var dataForHeatMap = data? data.map(d => ({data:[
        {gender:"Male", partTime:d.male_full_time, fullTime:d.male_part_time},
        {gender:"Female", partTime:d.fem_full_time, fullTime:d.fem_part_time}
    ]})):null;
    return (
    <div>
        {dataForDonut.length && 0 &&
            <DonutChart data={dataForDonut[0].data}/>
        }
        {dataForGroupedBarChart.length && 0 &&
            <GroupedBarChart data={dataForGroupedBarChart[0].data}/>
        }
        {dataForHeatMap.length && 1 &&
            <HeatMap data={dataForHeatMap[0].data}/>
        }
    </div>
);
}