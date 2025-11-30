import { getUsersProfiles, getUserProfile, getUserFirstAccess, updateUserFirstAccess, updateUserProfile, deleteUserProfile } from '../../repositories/profile';
import { supabase } from '../../config/supabase';

jest.mock('../../config/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
    })),
  },
}));

describe('Profile Repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Success Cases', () => {
    it('should get all user profiles', async () => {
      const mockProfiles = [{ id: '1', name: 'Test User' }];
      const selectMock = jest.fn().mockResolvedValue({ data: mockProfiles, error: null });
      (supabase.from as jest.Mock).mockReturnValue({ select: selectMock });

      const result = await getUsersProfiles();
      expect(result.data).toEqual(mockProfiles);
      expect(supabase.from).toHaveBeenCalledWith('user_profiles');
      expect(selectMock).toHaveBeenCalledWith('*');
    });

    it('should get a single user profile', async () => {
      const mockProfile = { id: '1', name: 'Test User' };
      const singleMock = jest.fn().mockResolvedValue({ data: mockProfile, error: null });
      const eqMock = jest.fn().mockReturnValue({ single: singleMock });
      const selectMock = jest.fn().mockReturnValue({ eq: eqMock });
      (supabase.from as jest.Mock).mockReturnValue({ select: selectMock });

      const result = await getUserProfile('1');
      expect(result.data).toEqual(mockProfile);
      expect(supabase.from).toHaveBeenCalledWith('user_profiles');
      expect(selectMock).toHaveBeenCalledWith('*');
      expect(eqMock).toHaveBeenCalledWith('id', '1');
    });

    it('should get user first access', async () => {
      const mockFirstAccess = { first_access: true };
      const singleMock = jest.fn().mockResolvedValue({ data: mockFirstAccess, error: null });
      const eqMock = jest.fn().mockReturnValue({ single: singleMock });
      const selectMock = jest.fn().mockReturnValue({ eq: eqMock });
      (supabase.from as jest.Mock).mockReturnValue({ select: selectMock });

      const result = await getUserFirstAccess('1');
      expect(result.data).toEqual(mockFirstAccess);
      expect(supabase.from).toHaveBeenCalledWith('user_profiles');
      expect(selectMock).toHaveBeenCalledWith('first_access');
      expect(eqMock).toHaveBeenCalledWith('id', '1');
    });

    it('should update user first access', async () => {
      const mockResponse = { data: [{ id: '1', first_access: false }], error: null };
      const eqMock = jest.fn().mockResolvedValue(mockResponse);
      const updateMock = jest.fn().mockReturnValue({ eq: eqMock });
      (supabase.from as jest.Mock).mockReturnValue({ update: updateMock });

      const result = await updateUserFirstAccess('1', false);
      expect(result).toEqual(mockResponse);
      expect(supabase.from).toHaveBeenCalledWith('user_profiles');
      expect(updateMock).toHaveBeenCalledWith({ first_access: false });
      expect(eqMock).toHaveBeenCalledWith('id', '1');
    });

    it('should update user profile', async () => {
      const mockProfile = { name: 'Updated Name' };
      const mockResponse = { data: [{ id: '1', name: 'Updated Name' }], error: null };
      const eqMock = jest.fn().mockResolvedValue(mockResponse);
      const updateMock = jest.fn().mockReturnValue({ eq: eqMock });
      (supabase.from as jest.Mock).mockReturnValue({ update: updateMock });

      const result = await updateUserProfile('1', mockProfile);
      expect(result).toEqual(mockResponse);
      expect(supabase.from).toHaveBeenCalledWith('user_profiles');
      expect(updateMock).toHaveBeenCalledWith(mockProfile);
      expect(eqMock).toHaveBeenCalledWith('id', '1');
    });

    it('should delete user profile', async () => {
      const mockResponse = { data: [{ id: '1' }], error: null };
      const eqMock = jest.fn().mockResolvedValue(mockResponse);
      const deleteMock = jest.fn().mockReturnValue({ eq: eqMock });
      (supabase.from as jest.Mock).mockReturnValue({ delete: deleteMock });

      const result = await deleteUserProfile('1');
      expect(result).toEqual(mockResponse);
      expect(supabase.from).toHaveBeenCalledWith('user_profiles');
      expect(deleteMock).toHaveBeenCalled();
      expect(eqMock).toHaveBeenCalledWith('id', '1');
    });
  });

  describe('Failure Cases', () => {
    it('should return an error when getting all user profiles fails', async () => {
      const mockError = { message: 'Failed to fetch profiles' };
      const selectMock = jest.fn().mockResolvedValue({ data: null, error: mockError });
      (supabase.from as jest.Mock).mockReturnValue({ select: selectMock });

      const result = await getUsersProfiles();
      expect(result.error).toEqual(mockError);
    });

    it('should return an error when getting a single user profile fails', async () => {
      const mockError = { message: 'Profile not found' };
      const singleMock = jest.fn().mockResolvedValue({ data: null, error: mockError });
      const eqMock = jest.fn().mockReturnValue({ single: singleMock });
      const selectMock = jest.fn().mockReturnValue({ eq: eqMock });
      (supabase.from as jest.Mock).mockReturnValue({ select: selectMock });

      const result = await getUserProfile('1');
      expect(result.error).toEqual(mockError);
    });

    it('should return an error when getting user first access fails', async () => {
      const mockError = { message: 'Failed to fetch first access' };
      const singleMock = jest.fn().mockResolvedValue({ data: null, error: mockError });
      const eqMock = jest.fn().mockReturnValue({ single: singleMock });
      const selectMock = jest.fn().mockReturnValue({ eq: eqMock });
      (supabase.from as jest.Mock).mockReturnValue({ select: selectMock });

      const result = await getUserFirstAccess('1');
      expect(result.error).toEqual(mockError);
    });

    it('should return an error when updating user first access fails', async () => {
      const mockError = { message: 'Failed to update first access' };
      const eqMock = jest.fn().mockResolvedValue({ data: null, error: mockError });
      const updateMock = jest.fn().mockReturnValue({ eq: eqMock });
      (supabase.from as jest.Mock).mockReturnValue({ update: updateMock });

      const result = await updateUserFirstAccess('1', false);
      expect(result.error).toEqual(mockError);
    });

    it('should return an error when updating user profile fails', async () => {
      const mockProfile = { name: 'Updated Name' };
      const mockError = { message: 'Failed to update profile' };
      const eqMock = jest.fn().mockResolvedValue({ data: null, error: mockError });
      const updateMock = jest.fn().mockReturnValue({ eq: eqMock });
      (supabase.from as jest.Mock).mockReturnValue({ update: updateMock });

      const result = await updateUserProfile('1', mockProfile);
      expect(result.error).toEqual(mockError);
    });

    it('should return an error when deleting user profile fails', async () => {
      const mockError = { message: 'Failed to delete profile' };
      const eqMock = jest.fn().mockResolvedValue({ data: null, error: mockError });
      const deleteMock = jest.fn().mockReturnValue({ eq: eqMock });
      (supabase.from as jest.Mock).mockReturnValue({ delete: deleteMock });

      const result = await deleteUserProfile('1');
      expect(result.error).toEqual(mockError);
    });
  });
});
