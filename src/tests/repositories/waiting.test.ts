import { getWaitingList, updateWaitingStatus } from '../../repositories/waiting';
import { supabase } from '../../config/supabase';

jest.mock('../../config/supabase', () => {

    const mockSupabase = {

      from: jest.fn().mockReturnThis(),

      select: jest.fn().mockReturnThis(),

      eq: jest.fn().mockReturnThis(),

      update: jest.fn().mockReturnThis(),

      single: jest.fn(),

    };

  

    mockSupabase.update = jest.fn(() => ({

      eq: jest.fn(() => ({

        select: jest.fn(() => ({

          single: mockSupabase.single,

        })),

      })),

    }));

  

    return { supabase: mockSupabase };

  });

  

  describe('Waiting Repository', () => {

    afterEach(() => {

      jest.clearAllMocks();

    });

  

    describe('Success Cases', () => {

      it('should get the waiting list for a user', async () => {

        const mockList = [{ user_id: 'user-123', waiting: true }];

        (supabase.from('waiting_list').select().eq as jest.Mock).mockResolvedValue({ data: mockList, error: null });

  

        const result = await getWaitingList('user-123');

        expect(result.data).toEqual(mockList);

        expect(supabase.from).toHaveBeenCalledWith('waiting_list');

      });

  

      it('should update the waiting status for a user', async () => {

        const mockResponse = { data: { user_id: 'user-123', waiting: false }, error: null };

        (supabase.single as jest.Mock).mockResolvedValue(mockResponse);

  

        const result = await updateWaitingStatus('user-123', false);

        expect(result.data).toEqual(mockResponse.data);

        expect(supabase.from).toHaveBeenCalledWith('waiting_list');

        expect(supabase.update).toHaveBeenCalledWith({ waiting: false });

      });

    });

  

    describe('Failure Cases', () => {

      it('should return an error when getting the waiting list fails', async () => {

        const mockError = { message: 'Failed to fetch waiting list' };

        (supabase.from('waiting_list').select().eq as jest.Mock).mockResolvedValue({ data: null, error: mockError });

  

        const result = await getWaitingList('user-123');

        expect(result.error).toEqual(mockError);

      });

  

      it('should return an error when updating the waiting status fails', async () => {

        const mockError = { message: 'Failed to update waiting status' };

        (supabase.single as jest.Mock).mockResolvedValue({ data: null, error: mockError });

  

        const result = await updateWaitingStatus('user-123', false);

        expect(result.error).toEqual(mockError);

      });

    });

  });
