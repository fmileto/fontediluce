var request = require('request');

module.exports = function (app) {

    app.get('/api/milestone', function (req, res) {


        request('https://www.kickstarter.com/projects/search.json?search=&term=sushi-notes-3d-sushi-sticky-notes',
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var json = JSON.parse(body);
                    console.log(json.projects[0]);

                    var item = json.projects[0];

                    var currency = item.currency;
                    var goal = item.goal;

                    var pledged = item.pledged;
                    var backers = item.backers_count;
                    var today = new Date();
                    var deadline = new Date(item.deadline*1000);
                    var daystogo = Math.round((deadline-today)/(1000*60*60*24));
                    daystogo = daystogo < 0 ? 0 : daystogo;
                    var funded = parseFloat(((pledged / goal) * 100).toFixed(2));
                    var result = {
                        pledged: pledged,
                        backers: backers,
                        daystogo: daystogo,
                        funded: funded,
                        currency: currency

                    };
                    
                    console.log(result);

                    res.json(result);
                }
            })
    });

};