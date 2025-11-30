import { getTrainingSheets, createTrainingSheet, deleteTrainingSheet } from '../../repositories/trainingSheet';
import { supabase } from '../../config/supabase';

jest.mock('../../config/supabase', () => ({
    supabase: {
      from: jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        insert: jest.fn().mockReturnThis(),
        single: jest.fn(),
        delete: jest.fn().mockReturnThis(),
      })),
    },
  }));
  
  describe('TrainingSheet Repository', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('Success Cases', () => {
      it('should get all training sheets for a user', async () => {
        const mockSheets = [{ id: '1', title: 'My Sheet' }];
        const eqMock = jest.fn().mockResolvedValue({ data: mockSheets, error: null });
        (supabase.from as jest.Mock).mockReturnValue({
          select: jest.fn().mockReturnValue({
            eq: eqMock,
          }),
        });
  
        const result = await getTrainingSheets('user-123');
        expect(result.data).toEqual(mockSheets);
        expect(supabase.from).toHaveBeenCalledWith('training_sheets');
        expect(eqMock).toHaveBeenCalledWith('user_id', 'user-123');
      });
  
      it('should create a training sheet', async () => {
        const sheetData = {
          userId: 'user-123',
          title: 'New Sheet',
          exercises: [{ name: 'Push Up', sets: 3, reps: 10, weight: 0 }],
        };
        const mockSheetId = { id: 'sheet-1' };
        const mockExercisesResponse = { data: sheetData.exercises, error: null };
  
        const singleMock = jest.fn().mockResolvedValue({ data: mockSheetId, error: null });
        const insertSheetsMock = jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: singleMock,
          }),
        });
  
        const insertExercisesMock = jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue(mockExercisesResponse),
        });
  
        (supabase.from as jest.Mock).mockImplementation((tableName: string) => {
          if (tableName === 'training_sheets') {
            return {
              insert: insertSheetsMock,
            };
          }
          if (tableName === 'training_sheet_exercises') {
            return {
              insert: insertExercisesMock,
            };
          }
          return {
            insert: jest.fn().mockReturnThis(),
            select: jest.fn().mockReturnThis(),
          };
        });
  
        const result = await createTrainingSheet(sheetData);
  
        expect(result.data).toEqual(mockExercisesResponse.data);
        expect(supabase.from).toHaveBeenCalledWith('training_sheets');
        expect(supabase.from).toHaveBeenCalledWith('training_sheet_exercises');
      });
  
      it('should delete a training sheet', async () => {
        const mockResponse = { data: [{ id: '1' }], error: null };
        const eqMock = jest.fn().mockResolvedValue(mockResponse);
        const eqChainMock = jest.fn().mockReturnValue({ eq: eqMock });
        (supabase.from as jest.Mock).mockReturnValue({
          delete: jest.fn().mockReturnValue({
            eq: eqChainMock,
          }),
        });
  
        const result = await deleteTrainingSheet('sheet-1', 'user-123');
        expect(result).toEqual(mockResponse);
        expect(supabase.from).toHaveBeenCalledWith('training_sheets');
        expect(eqChainMock).toHaveBeenCalledWith('id', 'sheet-1');
        expect(eqMock).toHaveBeenCalledWith('user_id', 'user-123');
      });
    });
  
    describe('Failure Cases', () => {
      it('should return an error when getting training sheets fails', async () => {
        const mockError = { message: 'Failed to fetch sheets' };
        const eqMock = jest.fn().mockResolvedValue({ data: null, error: mockError });
        (supabase.from as jest.Mock).mockReturnValue({
          select: jest.fn().mockReturnValue({
            eq: eqMock,
          }),
        });
  
        const result = await getTrainingSheets('user-123');
        expect(result.error).toEqual(mockError);
      });
  
      it('should throw an error when creating a training sheet fails', async () => {
        const sheetData = {
          userId: 'user-123',
          title: 'New Sheet',
          exercises: [{ name: 'Push Up', sets: 3, reps: 10, weight: 0 }],
        };
        const mockError = { message: 'Failed to create training sheet' };
        const singleMock = jest.fn().mockResolvedValue({ data: null, error: mockError });
        (supabase.from as jest.Mock).mockReturnValue({
          insert: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: singleMock,
            }),
          }),
        });
  
        await expect(createTrainingSheet(sheetData)).rejects.toThrow('Failed to create training sheet');
      });
  
      it('should return an error when deleting a training sheet fails', async () => {
        const mockError = { message: 'Failed to delete sheet' };
        const eqMock = jest.fn().mockResolvedValue({ data: null, error: mockError });
        const eqChainMock = jest.fn().mockReturnValue({ eq: eqMock });
        (supabase.from as jest.Mock).mockReturnValue({
          delete: jest.fn().mockReturnValue({
            eq: eqChainMock,
          }),
        });
  
        const result = await deleteTrainingSheet('sheet-1', 'user-123');
        expect(result.error).toEqual(mockError);
      });
    });
  });
