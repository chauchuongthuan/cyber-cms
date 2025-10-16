export enum PaymentStatusEnum {
   PAID = 1,
   UNPAID = 2,
}

export function PaymentStatusTrans(status = 1): string {
   return (
      {
         1: 'PAID',
         2: 'UNPAID',
      }[status] || ''
   );
}

export function OrderEnum(status = 1): string {
   return (
      {
         1: 'SUCCESS',
         2: 'FAILED',
      }[status] || ''
   );
}

export enum PaymentTypeEnum {
   BITCOIN = 1,
   USDT_TRC20 = 2,
   USDT_BEP20 = 3,
   ETHER = 4,
   LITECOIN = 5,
   PERFEC_MONEY = 6,
   USDT_ERC20 = 7,
}

export function PaymentTypeTrans(status = 1): string {
   return (
      {
         1: 'Bitcoin',
         2: 'USDT TRC20',
         3: 'USDT BEP20',
         4: 'Ether',
         5: 'Litecoin',
         6: 'BCH',
         7: 'USDT ERC20',
      }[status] || ''
   );
}
