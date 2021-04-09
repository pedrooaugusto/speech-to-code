
/**
 * Put the result of [EXPRESSION] in a new constant named current year
 * EXPRESSION = the function get full year applied to a new instance of the object date.
 */
const currentYear = new Date().getFullYear()

/**
 * Put the result of [EXPRESSION] in a new constant named birth date
 * EXPRESSION = the number 1998
 */
const birthDate = 1998

/**
 * Put the result of [EXPRESSION] in a new constant named age
 * EXPRESSION = constant quotes current year quotes minus constant quotes birth date quotes 
 */
const age = currentYear - birthDate

/**
 * [EXPRESSION]
 * EXPRESSION = the arguments ...[EXPRESSION] passed to the function quote log quote applied to the variable quote console quote
 * EXPRESSION = string quote your age is quote plus constante quote age quote
 */
console.log("Your age is: " + age)

// EXPRESSION = Number | String | NEW_INSTANCE | FN_CALL | REF_VARIABLE | EXPRESSION op EXPRESSION
//
// Number             = number [0-9]+*
// String             = string quote (.*?) quote
// RESERVED           = this | undefined | null
// REF_VARIABLE       = reference quote (.?*) quote
// NEW_INSTANCE       = new instance of quote (.*?) quote
// VALUES             = Number | String | REF_VARIABLE | NEW_INSTANCE | RESERVED
// VALUES_AND_OP      = VALUES + VALUES | VALUES - VALUES | VALUES * VALUES | VALUES / VALUES | VALUES
// NEW_INSTANCE_ARGS  = apply the arguments ...[VALUES_AND_OP] to a [NEW_INSTANCE]
// FN_CALL            = apply the arguments ...[VALUES_AND_OP](this) to the function quote (.?*) quote

// COMPLEX_VALUES     = VALUES_AND_OP | FN_CALL | NEW_INSTANCE_ARGS

// DECLARE_VAR        = Put the result of [COMPLEX_VALUES] in a new variable named 'hello'

// the arguments string quote your age quote plus reference age passed
// to the function log applied to reference console.

// Apply the argument hello to the function log called by console
// Apply the argument console and hello to the function log.

// Apply the argument console and string quore your age is quote plus age to the function log.

// Apply the argument console and [the result of the arguments string your age string applied
// to the function toUpperCase] to the function log

// put the value number 9 in the property 9 of a // a[0] = 9
// put the value 95 in the property value of item of reference a // a.item.value = 95