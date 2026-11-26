import { describe, expect, it } from 'vitest';
import { contactSchema, quoteSchema, submissionSchema } from './schemas';

const validQuote = {
  intent: 'sell',
  category: 'ferrous-metals',
  materials: ['hms'],
  description: '',
  quantity: '2.5',
  unit: 'tonnes',
  frequency: 'one-off',
  location: 'AB1 2CD',
  logistics: 'collect',
  preferredDate: '',
  firstName: 'Sam',
  lastName: 'Taylor',
  company: '',
  email: 'sam@example.com',
  phone: '+44 1234 567890',
  preferredContact: 'phone',
  consent: true,
  marketingOptIn: false,
};

describe('quoteSchema', () => {
  it('accepts a valid quote', () => {
    expect(quoteSchema.safeParse(validQuote).success).toBe(true);
  });

  it('rejects zero or non-numeric quantity', () => {
    expect(quoteSchema.safeParse({ ...validQuote, quantity: '0' }).success).toBe(false);
    expect(quoteSchema.safeParse({ ...validQuote, quantity: 'lots' }).success).toBe(false);
  });

  it('requires consent', () => {
    expect(quoteSchema.safeParse({ ...validQuote, consent: false }).success).toBe(false);
  });

  it('rejects an invalid email', () => {
    expect(quoteSchema.safeParse({ ...validQuote, email: 'nope' }).success).toBe(false);
  });
});

describe('contactSchema', () => {
  it('allows an empty phone but validates a provided one', () => {
    const base = {
      name: 'Sam',
      email: 'sam@example.com',
      subject: 'general',
      message: 'Hello there, a question.',
      consent: true,
    };
    expect(contactSchema.safeParse({ ...base, phone: '' }).success).toBe(true);
    expect(contactSchema.safeParse({ ...base, phone: 'abc' }).success).toBe(false);
  });
});

describe('submissionSchema', () => {
  it('discriminates on formType', () => {
    expect(
      submissionSchema.safeParse({ formType: 'quote', data: validQuote, token: '' }).success,
    ).toBe(true);
    expect(submissionSchema.safeParse({ formType: 'contact', data: validQuote }).success).toBe(
      false,
    );
  });
});
