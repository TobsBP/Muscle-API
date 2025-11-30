import { signUp, createProfile, signIn } from '../../repositories/auth';
import { supabase } from '../../config/supabase';

jest.mock('../../config/supabase', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
    },
    from: jest.fn().mockReturnThis(),
    insert: jest.fn(),
  },
}));

describe('Auth Repository', () => {
  describe('Success Cases', () => {
    it('should sign up a user', async () => {
      const mockUser = { email: 'test@example.com', password: 'password' };
      const mockResponse = { data: { user: { id: '123' }, session: null }, error: null };
      
      (supabase.auth.signUp as jest.Mock).mockResolvedValue(mockResponse);

      const result = await signUp(mockUser);
      expect(result).toEqual(mockResponse);
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: mockUser.email,
        password: mockUser.password,
      });
    });

    it('should create a user profile', async () => {
      const mockProfile = { name: 'Test User', goal: 'Get fit' };
      const userId = '123';
      const mockResponse = { data: [{ id: userId, ...mockProfile }], error: null };

      (supabase.from('user_profiles').insert as jest.Mock).mockResolvedValue(mockResponse);

      const result = await createProfile(mockProfile, userId);
      expect(result).toEqual(mockResponse);
      expect(supabase.from).toHaveBeenCalledWith('user_profiles');
      expect(supabase.from('user_profiles').insert).toHaveBeenCalledWith([
        { id: userId, ...mockProfile, name: mockProfile.name.trim(), goal: mockProfile.goal.trim() },
      ]);
    });

    it('should sign in a user', async () => {
      const mockUser = { email: 'test@example.com', password: 'password' };
      const mockResponse = { data: { user: { id: '123' }, session: { access_token: 'abc' } }, error: null };

      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue(mockResponse);

      const result = await signIn(mockUser);
      expect(result).toEqual(mockResponse);
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: mockUser.email,
        password: mockUser.password,
      });
    });
  });

  describe('Failure Cases', () => {
    it('should return an error on sign up failure', async () => {
      const mockUser = { email: 'test@example.com', password: 'password' };
      const mockError = { message: 'Sign up failed' };
      
      (supabase.auth.signUp as jest.Mock).mockResolvedValue({ data: { user: null, session: null }, error: mockError });

      const result = await signUp(mockUser);
      expect(result.error).toEqual(mockError);
    });

    it('should return an error on create profile failure', async () => {
      const mockProfile = { name: 'Test User', goal: 'Get fit' };
      const userId = '123';
      const mockError = { message: 'Create profile failed' };

      (supabase.from('user_profiles').insert as jest.Mock).mockResolvedValue({ data: null, error: mockError });

      const result = await createProfile(mockProfile, userId);
      expect(result.error).toEqual(mockError);
    });

    it('should return an error on sign in failure', async () => {
      const mockUser = { email: 'test@example.com', password: 'password' };
      const mockError = { message: 'Sign in failed' };

      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({ data: { user: null, session: null }, error: mockError });

      const result = await signIn(mockUser);
      expect(result.error).toEqual(mockError);
    });
  });
});
