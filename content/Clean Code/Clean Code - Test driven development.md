---
description: Clean code rules on TDD
---
# Clean Testing
## The Three Laws of Test Driven Development
1. You may not write production code until you have written a failing unit test
2. You may not write more of a unit test than is sufficient to fail.
3. You may not write more production code than is sufficient to pass the currently failing test

> [!success] Tests increase code trust
> Tests make your code flexible. With them, you can make any changes to your code you desire and know exactly what works-and what doesn't-once you're done implementing

## Having Dirty Tests is Worse Than Having No Tests
- The tests must change as the production code evolves -> The dirtier the tests, the harder they are to change
- Imagine this scenario: 
	- If tests are dirty, they cause frustration among devs
	- If devs are frustrated, they scrap the code base
	- If there are no tests, the defect rate begins to rise
	- If the defect rate rises, code starts to rot
	- Well, rotting code makes a lot of people unhappy


## Tests Must Be Readable
- You will want to say a lot with as few words as possible
- Avoid noise-write no code that's not absolutely necessary
- Structure your code after the **BOC** (Build-Operate-Check) - pattern
	1. Create all variables / mockups to run the test
	2. Call functions or methods to be tested
	3. Run **one assertion** on the results
- It helps to design tests with the `given-then-when` - pattern

```java 
public void testGetPageHierarchyAsXml() throws Exception {
	givenPages("PageOne", "PageOne.ChildOne", "PageTwo");
	whenRequestIsIssued("root", "type:pages");
	thenResponseShouldBeXML();
}

public void testGetPageHierarchyHasRightTags() throws Exception {
	givenPages("PageOne", "PageOne.ChildOne", "PageTwo");
	whenRequestIsIssued("root", "type:pages");
	thenResponseShouldContain("<name>PageOne</name>");
}
```

## Tests Must Be F.I.R.S.T
### Fast
Tests should run quickly. When they run slowly, you don't run them frequently. And when you don't run them frequently, the code will start to rot

### Independent
Tests should not depend on each other. You should be able to run each test independently.

### Repeatable
Tests should be repeatable in any environment. It should not matter whether they're executed in a prod, dev or integration environment.

### Self-Validating
Tests should return either true or false. One should not have to read through a file that tells them whether tests pass or not

### Timely
Unit tests should be written just **before the production code** that makes them pass. 