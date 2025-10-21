const Profile = require('../models/profile');

const getCurriculumByLang = async (req, res) => {
    const { lang } = req.params;
    console.log(req.params);
    console.log(lang);
    try {
        const data = await Profile.findOne({ lang: lang });
        if (data) {
            res.json(data);
        } else {
            res.status(404).send('Language not found');
        }
    } catch (error) {
        console.error(`Error in database research: ${error}`);
        res.status(500).send('Error in database research');
    }
};

module.exports = {
    getCurriculumByLang
};
