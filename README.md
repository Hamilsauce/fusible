# Fuse Protocol
  
## Interfaces

###  Fusible: An entity that can be infused with
Implements `fuse` method that provides defined way to accept an Infusible 
* `fuse(EnfusibleObject)`: Accepts object implementing `Infusible` protocol (`infuse` and `defuse` methods).
  - Extend: Calls the `infuse` method on the provided `Infusible`, passing reference to itself in as an argument
    to which the fusible fuses itself defined behavior.
  - Unextend: Calls the `defuse` method returned from `infuse` to remove infused behavior/data when 
    no longer needed;
      
* `fuse` must return a function that calls the `infusible`'s `defuse` method when called.
-

### Infusible: An object that infuses with
Implements `infuse` and `defuse` method for infusing itself with an Infusible object

* `infuse(fusibleObject)`: Adds/installs/extends 
      provided object with new behavior. infuse is called by 
      target fusible
    -defuse(): removes previously fused functionality
*/
