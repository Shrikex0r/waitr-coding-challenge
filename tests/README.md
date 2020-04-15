# Hey, aren't there supposed to be tests here?
There sure are! Unfortunately I've run into some issues that may take a while to fix. So rather than spin 
endlessly on those issues, I'm going to present some summaries of test cases here.

# What happened?
I'm using several tools either for the first time, or after a long period of absence, so I don't have as much
familiarity as I should with the frameworks (Node, Express), 3p libraries (postgres, mostly), platform (Heroku),
language (Javascript), and tools (swagger codegen) in play in this project. Specifically: I haven't been able to 
reverse-engineer a solution letting me do either dependency injection or monkey-patching to mock out an actual DB 
connection.

When I generated the app skeleton from the swagger spec, it created some test infrastructure alongside the stubs.
This was good, but I wasn't able to figure out the right idiom in this stack for testing against either an actual
database or a mocked out back end. Compounding the issue, I wasn't able to get postgres set up locally and integrated 
with Heroku for local dev. This has somewhat hobbled my progress, but rather than get stuck and deliver nothing, I 
chose to punt on that problem and instead address the _spirit_ of the requirement for testing.

I'm certain that given more time I'd be able to address this issue too - I refuse to believe that a framework as 
popular and widespread as Express doesn't have some mechanism for testing against both real and mocked data sources.
My personal preference is for a DI solution, but I've done enough preliminary research to see that there are multiple
bytecode manipulation approaches as well. Either will work, but I'd only monkey-patch as a last resort (e.g. a 
dependency library uses singletons or static variables to do its work).

# Test cases
I'll lay out test cases below by path, with scenarios and expected results clearly defined. Test cases will all 
reference the static seed data defined in this project's db/schema.sql file.

## /drivers/{driverId} (GET)
1. Happy path. User queries for existing driver id 3 (/drivers/3) and gets a 200 OK with the record for driver 
    No. 3: Niki Lauda.
1. Simple 404. User queries for non-existent driver ID 12 and gets a 404 not found.
1. TODO

## /drivers/{driverID}/reviews (GET)
1. Happy path. User queries for reviews for an existing driver with deliveries and reviews in the seed data 
   (/drivers/5/reviews) and receives a 200 OK with one 2-star delivery review for Santa Claus.
1. Nonexistent driver. User queries for the reviews of a driver that does not exist (/drivers/12/reviews), gets a
   404 Not Found.
1. Existing driver with no deliveries. User queries for the reviews of a driver that exists, but has no deliveries on 
   record (/drivers/4/reviews). Response is a 404.
1. Existing driver with deliveries but no existing reviews (/drivers/5/reviews). Response is a 404.

## /drivers/{driverID}/deliveries/{deliveryID} (POST)
TODO