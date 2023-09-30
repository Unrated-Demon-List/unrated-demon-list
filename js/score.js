/**
 * Numbers of decimal digits to round to
 */
const scale = 3;

// https://stackoverflow.com/questions/4116992/how-to-include-json-data-in-javascript-synchronously-without-parsing
function loadTextFileAjaxSync(filePath, mimeType){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",filePath,false);
    if (mimeType != null) {
        if (xmlhttp.overrideMimeType) {
            xmlhttp.overrideMimeType(mimeType);
        }
    }
    xmlhttp.send();
    if (xmlhttp.status==200 && xmlhttp.readyState == 4 ){
        return xmlhttp.responseText;
    }
    else {
        // TODO Throw exception
        return null;
    }
}

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    if (rank === null) {
        return 0;
    }
    else if (rank <= 150){
        if (rank>75){
            minPercent = 100;
        }
        let maximum_points = 250; //change this to change points of top 1
        let score = ((140 * maximum_points + 7000) / Math.sqrt(3157 * (rank - 1) + 19600) - 50) *
            ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));

        score = Math.max(0, score);
        if (isNaN(score)) {
            score = 0;
        }

        if (percent != 100) {
            return round(score - score / 3);
        }

        return round(score);
    }
    else{
        // Load json file;
        var json = loadTextFileAjaxSync(`/data/_list.json`, "application/json");
        // Parse json
        let list = JSON.parse(json);
        let filterlist = list.filter((name)=>name[0]!="_");
        let score = 4 * (rank - 151) / (151 - filterlist.length) + 5;
        return round(score);
    }
}

export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}
