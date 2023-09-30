/**
 * Numbers of decimal digits to round to
 */
const scale = 3;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export async function score(rank, percent, minPercent) {
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
        const listResult = await fetch(`${dir}/_list.json`);
            try {
                const list = await listResult.json();
                let filterlist = list.filter((name)=>name[0]!="_");
                let score = 4 * rank / (151 - list.length) + 5;
                return round(score);
            } catch {
                console.error(`Failed to load list.`);
                return null;
            }
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
