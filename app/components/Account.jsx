import {Link, AccountConnection} from '@shopify/polaris';
import {useState, useCallback} from 'react';

export default function Account() {
  const [connected, setConnected] = useState(false);
  const accountName = connected ? 'Jane Appleseed' : '';

  const handleAction =() => {
    setConnected(!connected);
  };

  const buttonText = connected ? 'Disconnect' : 'Connect';
  const details = connected ? 'Account connected' : 'No account connected';
  const terms = connected ? null : (
    <p>
      By clicking <strong>Connect</strong>, you agree to accept Sample App’s{' '}
      <Link url="/app">terms and conditions</Link>. You’ll pay a
      commission rate of 15% on sales made through Sample App.
    </p>
  );

  return (

    <div>
<AccountConnection
      accountName={accountName}
      connected={connected}
      title="Example App"
      action={{
        content: buttonText,
        onAction: handleAction,
      }}
      details={details}
      termsOfService={terms}
    />
    </div>
    
  );
}