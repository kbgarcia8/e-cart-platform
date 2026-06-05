import type { userPaymentMethodsDetailsDTO } from "./user.types";

export function mapToPaymentMethodDTO(dbRecord: any): userPaymentMethodsDetailsDTO {
    const baseFields = {
        id: dbRecord.id,
        isSelected: dbRecord.isSelected ?? false,
        created_at: dbRecord.created_at,
        updated_at: dbRecord.updated_at,
    };

    switch (dbRecord.type) {
        case 'COD':
            return {
                ...baseFields,
                type: 'COD',
                address: dbRecord.address ?? '',
                contact_person: dbRecord.contactPerson ?? '',
                contact_number: dbRecord.contactNumber ?? '',
            };
        case 'GCash':
        case 'PayMaya':
            return {
                ...baseFields,
                type: dbRecord.type,
                ewallet_account_name: dbRecord.eWalletAccountName ?? '',
                ewallet_number: dbRecord.eWalletAccountNumber ?? '',
            };
        case 'Bank_Transfer':
            return {
                ...baseFields,
                type: 'Bank_Transfer',
                bank_name: dbRecord.bankName ?? '',
                account_name: dbRecord.accountName ?? '',
                account_number: dbRecord.accountNumber ?? '',
            };
        case 'Credit_Card':
            return {
                ...baseFields,
                type: 'Credit_Card',
                bank_name: dbRecord.bankName ?? '',
                account_name: dbRecord.accountName ?? '',
                account_number: dbRecord.accountNumber ?? '',
                expiry: dbRecord.expiry ?? '',
                cvv: dbRecord.cvv ?? '',
            };
        default:
            throw new Error(`Invalid record type returned from database: ${dbRecord.type}`);
    }
}