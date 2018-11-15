exports.get_badge_message = function (req, res) {

    let db = req.db;
    let userId = req.body.userId;

    db.collection("Player").find({}, {}, function(e, docs) {
        let userElement = null;
        
        docs.forEach(element => {
            if (element.user_id === userId) {
                userElement = element;
            }
        });

        if (userElement === null) {
            res.status(401).send({ error: 'Invalid UserID' });
        } else {
            res.status(200);
            res.json({
                user_id: userElement.user_id,
                badge_text: "Top " + userElement.data.best_ranking + " in Ranking"
            });
            res.end();
        }
    });
}