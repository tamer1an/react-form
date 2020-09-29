import * as React from 'react';

export class Form extends React.Component {
  state: AppState = {
    missingFields: [],
    password: '',
    saving: false,
  };

  render() {
    return (
      <div> form </div>
    );
  }
}
