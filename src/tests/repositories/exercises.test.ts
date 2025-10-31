import { getExercises, getExercise, updateExercise, deleteExercise } from '../../repositories/exercises'

jest.mock('../../config/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockResolvedValue({ data: [], error: null }),
  },
}))

jest.mock('../../repositories/exercises');

describe('Success Cases', () => {
  it('should return a list of exercises', async () => {
    const mockExercises = [
      { id: 1, name: 'Push Up' },
      { id: 2, name: 'Squat' },
    ];

    (getExercises as jest.Mock).mockResolvedValue({ data: mockExercises, error: null });

    const response = await getExercises();
    expect(response.data).toEqual(mockExercises);
    expect(response.error).toBeNull();
  });

  it('should return a single exercise by id', async () => {
    const mockExercise = { id: 1, name: 'Push Up' };
    
    (getExercise as jest.Mock).mockResolvedValue({ data: mockExercise, error: null });

    expect(await getExercise(1)).toEqual({ data: mockExercise, error: null });
  });

  it('should update a single exercise by id', async () => {
    const mockExerciseUpdate = { id: 1, name: 'Push Up' };

    (updateExercise as jest.Mock).mockResolvedValue({ data: mockExerciseUpdate, error: null })

    expect(await updateExercise(1, 'Push down')).toEqual({ data: mockExerciseUpdate, error: null })
  });

  it('should delete a single exercise by id', async () => {
    (deleteExercise as jest.Mock).mockResolvedValue({ data: null, error: null });

    expect(await deleteExercise(4)).toEqual({ data: null, error : null });
  });
});

describe('Failure Cases', () => {
  it('should handle error when fetching exercises', async () => {
    const mockError = { message: 'Failed to fetch exercises' };

    (getExercises as jest.Mock).mockResolvedValue({ data: null, error: mockError });

    const response = await getExercises();

    expect(response.data).toBeNull();
    expect(response.error).toEqual(mockError);
  });

  it('should handle error when fetching a single exercise', async () => {
    const mockError = { message: 'Exercise not found' };

    (getExercise as jest.Mock).mockResolvedValue({ data: null, error: mockError });

    expect(await getExercise(999)).toEqual({ data: null, error: mockError });
  });

  it('should handle error when fetching a update exercise', async () => {
    (updateExercise as jest.Mock).mockResolvedValue({ data: null, error: "Can't update" });

    expect(await updateExercise(7, 'Papa')).toEqual({ data: null, error: "Can't update"})
  });
});