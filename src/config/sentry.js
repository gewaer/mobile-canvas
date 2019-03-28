import { Sentry } from 'react-native-sentry';
import { SENTRY_KEY } from 'react-native-dotenv';
Sentry.config(SENTRY_KEY).install();

export default Sentry;