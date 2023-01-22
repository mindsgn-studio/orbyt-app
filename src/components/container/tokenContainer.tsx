//@ts-ignore
import { ALCHEMY_SDK } from '@env';
//@ts-ignore
import { TokenCard } from '@orbyt/components';
//@ts-ignore
import { colors } from '@orbyt/constants';
import { Network, Alchemy } from 'alchemy-sdk';
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import RPC from '../../lib/rpc';

const settings = {
  apiKey: ALCHEMY_SDK,
  network: Network.MATIC_MAINNET,
};

const TokenContainer = (props: any) => {
  const [list, setList] = React.useState<any>([]);
  const { privKey } = props;
  const [alchemy] = React.useState<any>(new Alchemy(settings));

  const getWallet = async () => {
    // Wallet address
    const address = await RPC.getAccounts(privKey);
    // Get token balances
    const balances = await alchemy.core.getTokenBalances(address);
    // Remove all accounts with 0
    const nonZeroBalances = balances.tokenBalances.filter((token: any) => {
      return token.tokenBalance !== '0';
    });

    const array = [];
    // Loop through all tokens with non-zero balance
    for (const token of nonZeroBalances) {
      // Get balance of token
      let balance = token.tokenBalance;

      // Get metadata of token
      const metadata = await alchemy.core.getTokenMetadata(
        token.contractAddress
      );

      // Compute token balance in human-readable format
      balance = balance / Math.pow(10, metadata.decimals);
      balance = balance.toFixed(2);

      array.push({
        name: `${metadata.name}`,
        balance: `${balance}`,
        symbol: `${metadata.symbol}`,
      });
    }
    setList(array);
  };

  React.useEffect(() => {
    getWallet();
  }, []);

  return (
    <>
      <View
        style={{
          margin: 10,
        }}
      >
        <Text
          style={{
            fontFamily: 'SF-Pro-Rounded-Bold',
            fontSize: 25,
            color: colors.orange,
          }}
        >
          TOKENS
        </Text>
        {list.map((item: any, index: any) => {
          return (
            <TokenCard
              key={index}
              name={item.symbol}
              symbol={item.symbol}
              amount={item.balance}
            />
          );
        })}
      </View>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    connected: state.connected,
    privKey: state.privKey,
    user: state.user,
    error: state.error,
  };
};

export default connect(mapStateToProps)(TokenContainer);
