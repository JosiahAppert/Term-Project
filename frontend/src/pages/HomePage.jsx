// ###############################################################################
// frontend/src/pages/HomePage.jsx
// Citations for the following code:
//   Adapted from the following sources:
//   1. Exploration - Web Application Technology
//      Date: November 3, 2025
//      https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-
//         application-technology-2?module_item_id=25645131
// ###############################################################################
function HomePage() {
    return (
        <>
            <h1>Home Page</h1>
            <div className="homepageDescription">
                <p>This project began with a wide concept of tracking everything a 
                    sports team might manage financially, including tickets, 
                    concessions, equipment, and player expenses. As we built our 
                    early drafts and reviewed feedback, it became clear that some 
                    of the original entities created more complexity than benefit. 
                    Concessions and Equipment, for example, were barely populated 
                    and did not meaningfully support the core purpose of the system. 
                    After considering feedback from our TA and classmates, we 
                    narrowed the design to the entities that directly support 
                    financial tracking and event management: Events, Tickets, 
                    TicketHolders, Players, and PlayerEvents. This adjustment made 
                    the database cleaner, more focused, and easier to normalize.</p>
                <p>Throughout the refinement process, we improved the organization 
                    and clarity of the project. We reworked the overview so the 
                    explanation followed a logical flow, standardized attribute 
                    naming with camelCase, added clearer column labels, and 
                    corrected the ERD to accurately show every table we implemented. 
                    We also added dropdown selectors to make relationship updates 
                    more intuitive on the website. In addition, we separated DDL 
                    and DML procedures into their own files and added citations 
                    and documentation that were missing from earlier drafts.</p>
                <p>AI tools were helpful with brainstorming parts of the project, 
                    however, the output often needed manual correction to meet 
                    course standards, and AI sometimes missed important project-specific 
                    details. Human feedback from peers and the TA was the most reliable 
                    source for identifying gaps in normalization, improving clarity, 
                    and shaping the final design. Overall, the project grew into a 
                    much more polished and intentional system. Each round of revision 
                    improved the design, strengthened the implementation, and clarified 
                    the purpose of the database. What started as a broad idea became a 
                    well structured application that supports meaningful financial 
                    tracking and event management for a sports team.</p>
            </div>
        </>
    );
}

export default HomePage;