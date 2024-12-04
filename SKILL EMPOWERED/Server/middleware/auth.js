async function authenticateUser(email, password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (user && await user.validatePassword(password)) {
        console.log('Authentication successful');
      } else {
        console.log('Invalid email or password');
      }
    } catch (error) {
      console.error('Error authenticating user:', error);
    }
  }
  