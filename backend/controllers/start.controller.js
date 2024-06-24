import LastNews from '../models/lastnews.model.js';

class StartController {
  // @desc    Pobranie najnowszych wiadomości
  // @route   GET /api/start
  async getLastNews(req, res) {
    try {
      const news = await LastNews.find().sort({ date: -1 });
      res.status(200).json(news);
    } catch (error) {
      console.log('Error in getLastNews controller', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // @desc    Dodanie nowej wiadomości
  // @route   POST /api/start
  async addNews(req, res) {
    try {
      const { date, description, author } = req.body;

      const newNews = new LastNews({
        date,
        description,
        author,
      });

      await newNews.save();
      res.status(201).json(newNews);
    } catch (error) {
      console.log('Error in addNews controller', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new StartController();
