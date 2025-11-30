import { signUp, createProfile, signIn } from '../../services/auth';
import { signUp as signUpRepo, createProfile as createProfileRepo, signIn as signInRepo } from '../../repositories/auth';

jest.mock('../../repositories/auth');

describe('Auth Service', () => {
  describe('Success Cases', () => {
    it('should sign up a user', async () => {
      const mockUser = { email: 'test@example.com', password: 'password' };
      const mockResponse = { user: { id: '123' }, session: null };
      
      (signUpRepo as jest.Mock).mockResolvedValue({ data: mockResponse, error: null });

      const result = await signUp(mockUser);
      expect(result).toEqual(mockResponse);
    });

    it('should create a user profile', async () => {
        const mockProfile = { name: 'Test User' };
        const userId = '123';
        const mockResponse = { id: '1', name: 'Test User' };

        (createProfileRepo as jest.Mock).mockResolvedValue({ data: mockResponse, error: null });

        const result = await createProfile(mockProfile, userId);
        expect(result).toEqual(mockResponse);
    });

    it('should sign in a user', async () => {
        const mockUser = { email: 'test@example.com', password: 'password' };
        const mockResponse = { user: { id: '123' }, session: { access_token: 'abc' } };

        (signInRepo as jest.Mock).mockResolvedValue({ data: mockResponse, error: null });

        const result = await signIn(mockUser);
        expect(result).toEqual(mockResponse);
    });
  });

  describe('Failure Cases', () => {
    it('should throw an error on sign up failure', async () => {
      const mockUser = { email: 'test@example.com', password: 'password' };
      const mockError = { message: 'Sign up failed' };
      
      (signUpRepo as jest.Mock).mockResolvedValue({ data: null, error: mockError });

      await expect(signUp(mockUser)).rejects.toThrow(mockError.message);
    });

    it('should throw an error on create profile failure', async () => {
        const mockProfile = { name: 'Test User' };
        const userId = '123';
        const mockError = { message: 'Create profile failed' };

        (createProfileRepo as jest.Mock).mockResolvedValue({ data: null, error: mockError });

        await expect(createProfile(mockProfile, userId)).rejects.toThrow(mockError.message);
    });

    it('should throw an error on sign in failure', async () => {
        const mockUser = { email: 'test@example.com', password: 'password' };
        const mockError = { message: 'Sign in failed' };

        (signInRepo as jest.Mock).mockResolvedValue({ data: null, error: mockError });

        await expect(signIn(mockUser)).rejects.toThrow(mockError.message);
    });
  });
});
