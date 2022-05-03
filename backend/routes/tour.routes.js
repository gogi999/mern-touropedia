import express from 'express';
import { 
    createTour, 
    getTours, 
    getTour, 
    getToursByUser,
    updateTour,
    deleteTour,
    getToursBySearch,
    getToursByTag,
    getRelatedTours,
    likeTour
} from '../controllers/tour.controllers.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTours);
router.get('/search', getToursBySearch);
router.get('/:id', getTour);
router.get('/tag/:tag', getToursByTag);
router.post('/relatedTours', getRelatedTours);

router.post('/', auth, createTour);
router.get('/userTours/:id', auth, getToursByUser);
router.patch('/:id', auth, updateTour);
router.delete('/:id', auth, deleteTour);
router.patch('/like/:id', auth, likeTour);

export default router;
