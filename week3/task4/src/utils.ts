import BigNumber from "bignumber.js"

export function web3BNToFloatString(
    bn: number,
    divideBy: BigNumber,
    decimals: number,
    roundingMode = BigNumber.ROUND_DOWN
  ) {
    const converted = new BigNumber(bn.toString())
    const divided = converted.div(divideBy)
    return divided.toFixed(decimals, roundingMode)
  }