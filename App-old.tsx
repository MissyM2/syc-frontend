import { Fragment } from 'react';
import Header from './components/Header.tsx';
import SignInSignUp from './components/SignInSignUp.tsx';

const App = () => {
  return (
    <Fragment>
      <Header />
      <SignInSignUp />
    </Fragment>
  );
};

export default App;
