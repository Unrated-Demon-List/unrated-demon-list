/**
 * Numbers of decimal digits to round to
 */
const scale = 3;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @param {Number} listlen Length of the entire list
 * @returns {Number}
 */
export function score(rank, percent, minPercent, listlen) {
    let returnval = 0;
    if (rank!== null && rank <= 150){
        if (rank > 75){
            minPercent = 100;
        }
        /* Old Formula
        let maximum_points = 250; //change this to change points of top 1
        let score = ((140 * maximum_points + 7000) / Math.sqrt(3157 * (rank - 1) + 19600) - 50) *
            ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));
        */
        let score = 3615.96/(rank+9.33109)-0.00722289*rank;
        score = Math.max(0, score);
        if (isNaN(score)) {
            score = 0;
        }

        if (percent != 100) {
            returnval = round(score - score / 3);
        }
        else {
            returnval = round(score);
        }
    }
    else {
        let score = 14 * (rank - 151) / (151 - listlen) + 15;
        returnval = round(score);
    }
    return returnval;
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
