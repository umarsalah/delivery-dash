import devConfigration from './configuration.development';
import prodConfigration from './configuration.production';

const NODE_ENV = process.env.NODE_ENV || 'development';

export default NODE_ENV === 'production' ? prodConfigration : devConfigration;
