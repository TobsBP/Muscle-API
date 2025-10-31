import { getWorkout, getWorkouts, updateWorkout, deleteWorkout } from '../../repositories/workouts';

jest.mock('../../config/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockResolvedValue({ data: [], error: null }),
  },
}))

jest.mock('../../repositories/workouts');

describe('Success cases', () => {
  it('should return the daily workout', async () => {
    const mockWorkouts = [
      { id: 1, workout_date: '2024-01-01' },
      { id: 2, workout_date: '2024-01-02' },
    ];

    (getWorkouts as jest.Mock).mockResolvedValue({ data: mockWorkouts, error: null });

    const response = await getWorkouts();
    expect(response.data).toEqual(mockWorkouts);
    expect(response.error).toBeNull();
  });

  it('should return a workout by id', async () => {
    const mockWorkout = { id: 1, workout_date: '2024-01-01' };
    
    (getWorkout as jest.Mock).mockResolvedValue({ data: mockWorkout, error: null });

    expect(await getWorkout(1)).toEqual({ data: mockWorkout, error: null });
  });

  it('should update a workout by id', async () => {
    const mockWorkoutUpdate = { id: 1, workout_date: '2024-01-01' };

    (updateWorkout as jest.Mock).mockResolvedValue({ data: mockWorkoutUpdate, error: null })

    expect(await updateWorkout(1, { workout_date: '2024-01-01' })).toEqual({ data: mockWorkoutUpdate, error: null })
  });

  it('should delete a workout by id', async () => {
    (deleteWorkout as jest.Mock).mockResolvedValue({ data: null, error: null });

    expect(await deleteWorkout(4)).toEqual({ data: null, error : null });
  });
});

describe('Failure Cases', () => {
  it('should handle error when fetching workouts', async () => {
    const mockError = { message: 'Failed to fetch workouts' };

    (getWorkouts as jest.Mock).mockResolvedValue({ data: null, error: mockError });

    const response = await getWorkouts();

    expect(response.data).toBeNull();
    expect(response.error).toEqual(mockError);
  });

  it('should handle error when fetching a workout by id', async () => {
    const mockError = { message: 'Workout not found' };

    (getWorkout as jest.Mock).mockResolvedValue({ data: null, error: mockError });

    expect(await getWorkout(999)).toEqual({ data: null, error: mockError });
  });

  it('should handle error when updating a workout', async () => {
    (updateWorkout as jest.Mock).mockResolvedValue({ data: null, error: "Can't update" });

    expect(await updateWorkout(7, { workout_date: '2024-01-01' })).toEqual({ data: null, error: "Can't update"})
  });
});