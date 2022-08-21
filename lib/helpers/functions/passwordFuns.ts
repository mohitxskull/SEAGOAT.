import zxcvbn from 'zxcvbn';

const PasswordStrengthDescription = (SCORE: 0 | 1 | 2 | 3 | 4) => {
  switch (SCORE) {
    case 0:
      return { des: 'Very weak', color: '#c92a2a' };

    case 1:
      return { des: 'Weak', color: '#d9480f' };

    case 2:
      return { des: 'Moderate', color: '#e67700' };

    case 3:
      return { des: 'Strong', color: '#5c940d' };

    case 4:
      return { des: 'Very strong', color: '#2b8a3e' };

    default:
      return { des: 'Not valid score', color: '#d9480f' };
  }
};

const Password = {
  Strength: (PASSWORD: string) => {
    const ZxcvbnRes = zxcvbn(PASSWORD);

    return PasswordStrengthDescription(ZxcvbnRes.score);
  },
};

export default Password;
