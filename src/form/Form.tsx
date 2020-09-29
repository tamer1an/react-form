import * as React from 'react';
import { ChangeEvent, SyntheticEvent } from 'react';
import { Typography } from '@material-ui/core';
import { input } from './createElement';

export class Form extends React.Component {
  state: AppState = {
    missingFields: [],
    password: '',
    saving: false,
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submit} onInvalid={this.onInvalid}>
          <Typography variant="h6" gutterBottom>
            <p>React Form</p>
          </Typography>

          <fieldset className="personal" disabled={this.state.saving}>
            <legend>New User</legend>
            {input('First Name', {
              pattern: '[a-zA-Z]{1,15}',
              autoFocus: true,
              title: 'Firstname (Optional)',
            })}
            {input('Username', {
              required: true,
              pattern: '^[a-zA-Z][a-zA-Z0-9-_\\.]{1,20}$',
            })}
            {input('Password', {
              required: true,
              type: 'password',
              pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
              autoCapitalize: 'off',
            })}
            {input('Re Password', {
              required: true,
              type: 'password',
              pattern: '.{8,}',
              autoCapitalize: 'off',
            })}
            {input('Email', {
              required: true,
              autoCapitalize: 'off',
              type: 'email',
              pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$',
            })}
          </fieldset>
          <div className="submit">
            {input('', {
              type: 'submit',
              onClick: this.onSubmitClick,
              disabled: this.state.saving,
            })}
          </div>
        </form>

        <details open>
          <summary>
            Submission details:
            <span>
              {this.state.missingFields.length > 0 ? <i>in progress</i> : ' Fill the form '}
            </span>
          </summary>
          <ul>
            {this.state.missingFields.map((field: string, key) => (
              <li key={key}>{field}</li>
            ))}
          </ul>
        </details>
      </div>
    );
  }

  private onInvalid = (e: ChangeEvent<HTMLFormElement>) => {
    this.setState(() => {
      const copy = this.state.missingFields.slice();
      if (copy.includes(e.target.name)) {
        return this.state;
      }
      return { missingFields: [...copy, e.target.name] };
    });
  };

  private submit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordInputs: HTMLInputElement[] = Array.from(
      e.target.querySelectorAll('[type="password"]'),
    );
    const passwords = passwordInputs.map((v) => v.value);

    if (!passwords.every((v: string) => v === passwords[0])) {
      passwordInputs[0].focus();
      this.setState({ missingFields: ['passwords: they do not match'] });
    } else {
      this.setState(() => {
        return { saving: true };
      });
      setTimeout(() => {
        console.log('Saved!!!', e);
        this.setState(() => {
          return { saving: false, missingFields: ['Saved!!!'] };
        });
      }, 2000);
    }
  };

  private onSubmitClick = () => {
    this.setState(() => {
      return { missingFields: [] };
    });
  };
}
