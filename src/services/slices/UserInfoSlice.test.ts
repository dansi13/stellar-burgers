import { AnyAction } from '@reduxjs/toolkit';
import userStateSlice, {
  TStateUser,
  authChecked,
  userApi,
  toRegisterUser,
  logInUser,
  logOutUser,
  updateUser
} from './UserinfoSlice';
import { TUser } from '@utils-types';

const initialState: TStateUser = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserError: null,
  loginUserRequest: false
};

type RootState = {
  userstate: TStateUser;
};

describe('userStateSlice reducers', () => {
  it('should return initial state', () => {
    const action: AnyAction = { type: 'INIT' };
    expect(userStateSlice.reducer(undefined, action)).toEqual(initialState);
  });

  describe('userApi', () => {
    it('should handle pending state', () => {
      const action = { type: userApi.pending.type };
      const state = userStateSlice.reducer(initialState, action);

      expect(state.loginUserRequest).toBe(true);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserError).toBeNull();
      expect(state.user).toBeNull();
    });

    it('should handle successful state', () => {
      const mockUser: TUser = {
        name: 'Test User',
        email: 'test@test.com'
      };
      const action = {
        type: userApi.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = userStateSlice.reducer(initialState, action);

      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('should handle failed state', () => {
      const error = 'Failed to fetch user data';
      const action = {
        type: userApi.rejected.type,
        error: { message: error }
      };
      const state = userStateSlice.reducer(initialState, action);

      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserError).toBe(error);
      expect(state.user).toBeNull();
    });
  });

  describe('toRegisterUser', () => {
    it('should handle pending state', () => {
      const action = { type: toRegisterUser.pending.type };
      const state = userStateSlice.reducer(initialState, action);

      expect(state.loginUserRequest).toBe(true);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });

    it('should handle successful registration', () => {
      const mockUser: TUser = {
        name: 'New User',
        email: 'new@test.com'
      };
      const action = {
        type: toRegisterUser.fulfilled.type,
        payload: mockUser
      };
      const state = userStateSlice.reducer(initialState, action);

      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
    });

    it('should handle failed registration', () => {
      const error = 'Failed to fetch register user';
      const action = {
        type: toRegisterUser.rejected.type,
        error: { message: error }
      };
      const state = userStateSlice.reducer(initialState, action);

      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserError).toBe(error);
    });
  });

  describe('logInUser', () => {
    it('should handle pending state', () => {
      const action = { type: logInUser.pending.type };
      const state = userStateSlice.reducer(initialState, action);

      expect(state.loginUserRequest).toBe(true);
      expect(state.loginUserError).toBeNull();
    });

    it('should handle successful login', () => {
      const mockUser: TUser = {
        name: 'Logged User',
        email: 'logged@test.com'
      };
      const action = {
        type: logInUser.fulfilled.type,
        payload: mockUser
      };
      const state = userStateSlice.reducer(initialState, action);

      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('should handle failed login', () => {
      const error = 'Failed to fetch Log in user';
      const action = {
        type: logInUser.rejected.type,
        error: { message: error }
      };
      const state = userStateSlice.reducer(initialState, action);

      expect(state.loginUserRequest).toBe(false);
      expect(state.loginUserError).toBe(error);
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('logOutUser', () => {
    const mockUser: TUser = {
      name: 'Test User',
      email: 'test@test.com'
    };

    const loggedInState: TStateUser = {
      ...initialState,
      isAuthenticated: true,
      user: mockUser
    };

    it('should handle pending state', () => {
      const action = { type: logOutUser.pending.type };
      const state = userStateSlice.reducer(loggedInState, action);

      expect(state.loginUserRequest).toBe(true);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should handle successful logout', () => {
      const action = { type: logOutUser.fulfilled.type };
      const state = userStateSlice.reducer(loggedInState, action);

      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });

    it('should handle failed logout', () => {
      const error = 'Failed to fetch Log Out user';
      const action = {
        type: logOutUser.rejected.type,
        error: { message: error }
      };
      const state = userStateSlice.reducer(loggedInState, action);

      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserError).toBe(error);
    });
  });

  describe('updateUser', () => {
    const mockUser: TUser = {
      name: 'Test User',
      email: 'test@test.com'
    };

    const loggedInState: TStateUser = {
      ...initialState,
      isAuthenticated: true,
      user: mockUser
    };

    it('should handle pending state', () => {
      const action = { type: updateUser.pending.type };
      const state = userStateSlice.reducer(loggedInState, action);

      expect(state.loginUserRequest).toBe(true);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should handle successful update', () => {
      const updatedUser: TUser = {
        name: 'Updated User',
        email: 'updated@test.com'
      };
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: updatedUser }
      };
      const state = userStateSlice.reducer(loggedInState, action);

      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(updatedUser);
    });

    it('should handle failed update', () => {
      const error = 'Failed to fetch update user';
      const action = {
        type: updateUser.rejected.type,
        error: { message: error }
      };
      const state = userStateSlice.reducer(loggedInState, action);

      expect(state.loginUserRequest).toBe(false);
      expect(state.loginUserError).toBe(error);
    });
  });

  describe('selectors', () => {
    const mockUser: TUser = {
      name: 'Test User',
      email: 'test@test.com'
    };

    const testState: RootState = {
      userstate: {
        user: mockUser,
        isAuthenticated: true,
        loginUserError: null,
        isAuthChecked: true,
        loginUserRequest: false
      }
    };

    it('should select user', () => {
      expect(userStateSlice.selectors.selectUser(testState)).toEqual(mockUser);
    });

    it('should select authentication status', () => {
      expect(userStateSlice.selectors.selectIsAuthenticated(testState)).toBe(
        true
      );
    });

    it('should select login error', () => {
      expect(
        userStateSlice.selectors.selectLoginUserError(testState)
      ).toBeNull();
    });

    it('should select auth checked status', () => {
      expect(userStateSlice.selectors.selectIsAuthChecked(testState)).toBe(
        true
      );
    });

    it('should select login request status', () => {
      expect(userStateSlice.selectors.selectloginUserRequest(testState)).toBe(
        false
      );
    });
  });
});
