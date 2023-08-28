import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PaymentForm } from './PaymentForm';
import { useState, useEffect } from 'react';

const App = () => {
  const [clientToken, setClientToken] = useState(null);

  const initialOptions = {
    'client-id':
      'ATcbsWeJib7eBUta2p5NaO64gvVFwIjJV2vEBu9wfP_ALWWiUtlxuo0OHxeCBsv807oldJyihRjS5AzR',
    'data-client-token': clientToken,
    components: 'hosted-fields,buttons',
    'enable-funding': 'paylater,venmo',
    'data-sdk-integration-source': 'integrationbuilder_ac',
  };

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/token', {
        method: 'POST',
      });
      const { client_token } = await response.json();
      setClientToken(client_token);
    })();
  }, []);
  return (
    <>
      {clientToken ? (
        <PayPalScriptProvider options={initialOptions}>
          <PaymentForm />
        </PayPalScriptProvider>
      ) : (
        <h4>WAITING ON CLIENT TOKEN</h4>
      )}
    </>
  );
};

export default App;
