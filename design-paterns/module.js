const myModule = (function() {
  // Private variables and functions
  let privateVariable = 'I am private';
  
  function privateMethod() {
    console.log('Accessing private variable:', privateVariable);
  }

  // Public API
  return {
    publicMethod: function() {
      console.log('This is a public method');
      privateMethod(); // Can access private method
    },
    getPrivateVariable: function() {
      return privateVariable;
    },
    setPrivateVariable: function(value) {
      privateVariable = value;
    }
  };
})();