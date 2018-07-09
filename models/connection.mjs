import mongoose from 'mongoose';

import dbConfig from '../configs/database';

mongoose.connect(`mongodb://${ dbConfig.host }/${ dbConfig.database }`);
