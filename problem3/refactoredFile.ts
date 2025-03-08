interface WalletBalance {
  currency: string;
  amount: number;
}

// i delete existing interface FormmattedWalletBalance and  use extends instead because FormmattedWalletBalance interface same as WalletBalance interface
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  // i add  WalletBalance[] for this balances because  it will be used in sortedBalances and use the same key as  WalletBalance interface
  const balances: WalletBalance[] = useWalletBalances();
  /*
    I add type Record<string,number> for prices because on the line 80 use prices[balance.currency] to mutiply
    it's mean prices is a object like this 
    prices = {
        Osmosis : number,
        Etherum: number,
        ... and more currency
    }
  */
  const prices: Record<string, number> = usePrices();

  // the switch case in this function using blockchain as a string and the arguments of this function also string so i change blockchain: any => blockchain: string
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      // Neo and Zilliqa return the same value so i put them together
      case 'Zilliqa':
      case 'Neo':
        return 20;

      default:
        return -99;
    }
  };

  // i add interface WalletBalance[] for this array because the output is an array object with the key like WalletBalance interface
  const sortedBalances: WalletBalance[] = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        // Change balance.blockchain => balance.currency because in WalletBalance interface does not have blockchain key
        // Delete unnecessary code and make the condition shorter
        /*
            I was confusing about balance.amount <= 0 condition , i dont know this is the purpose 
            of this filter to filter negative amount or it 's truly a bug.
            Then i decided to change it balance.amount <= 0  into balance.amount >= 0
        */
        return getPriority(balance.currency) > -99 && balance.amount >= 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        // Change balance.blockchain => balance.currency because in WalletBalance interface does not have blockchain key
        // purpose of this sort is want to make a descending order array, so i deleted unnecessary code and make the condition shorter
        return getPriority(rhs.currency) > getPriority(lhs.currency);
      });
  }, [balances, prices]);

  // i add interface FormattedWalletBalance[] for this array because map method adding formattted into object
  const formattedBalances: FormattedWalletBalance[] = sortedBalances.map(
    (balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed(),
      };
    }
  );

  // i use formattedBalances instead of sortedBalances because on the line 87 have balance.formatted and sortedBalances array does not have formatted key
  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
