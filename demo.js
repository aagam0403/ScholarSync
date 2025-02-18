async function fetchScholarships() {
    const name = document.getElementById("name").value.trim();
    const hsc_marks = document.getElementById("hsc_marks").value.trim();
    const ssc_marks = document.getElementById("ssc_marks").value.trim();
    const graduation_marks = document.getElementById("percent").value.trim();

    // Check if any field is empty
    if (!name || !gender  || !caste_category) {
        document.getElementById("scholarshipResults").innerHTML = "<p style='color: red; font-weight: bold;'>Fill the form first to find your Scholarship!</p>";
        return;
    }

    try {
        const response = await fetch("https://cors-anywhere.herokuapp.com/https://scholarly-sooty.vercel.app/api/v1/find-scholarships", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                "name": name,
                "hsc_marks": parseInt(hsc_marks, 10) || 0,
                "ssc_marks": parseInt(ssc_marks, 10) || 0,
                "graduation_marks": parseInt(graduation_marks, 10) || 0,
                "caste_category": "General",
                "otherDetails": ""
            })
        });
        
        const data = await response.json();

        if (data.length === 0) {
            document.getElementById("scholarshipResults").innerHTML = "<p>No scholarships found.</p>";
            return;
        }

        console.log(data);

        displayScholarships(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("scholarshipResults").innerHTML = "<p>Error fetching scholarships.</p>";
    }
}


function displayScholarships(scholarships) {
    let tableHTML = `
        <h1><center><b>These are the Scholarships You Can Get!!!</b></center></h1>
        <hr>  
        <br> 
        <table cellspacing="3" cellpadding="10" style="border-collapse: collapse; width: 100%; border: 2px solid black;">
            <thead>
                <tr style="border: 2px solid black;">
                    <th style="border: 2px solid black;">ID</th>
                    <th style="border: 2px solid black;">Name</th>
                    <th style="border: 2px solid black;">Description</th>
                    <th style="border: 2px solid black;">Provider</th>
                    <th style="border: 2px solid black;">Amount</th>
                    <th style="border: 2px solid black;">Deadline</th>
                    <th style="border: 2px solid black;">Link</th>
                </tr>
            </thead>
            <tbody>`;

    scholarships.forEach(scholarship => {
        tableHTML += `
            <tr style="border: 2px solid black;">
                <td style="border: 2px solid black;">${scholarship.id}</td>
                <td style="border: 2px solid black;">${scholarship.name}</td>
                <td style="border: 2px solid black;">${scholarship.description}</td>
                <td style="border: 2px solid black;">${scholarship.provider}</td>
                <td style="border: 2px solid black;">${scholarship.amount}</td>
                <td style="border: 2px solid black;">${new Date(scholarship.deadline).toLocaleDateString()}</td>
                <td style="border: 2px solid black; color: blue;"><a href="${scholarship.url}" target="_blank">Apply Here</a></td>
            </tr>`;
    });

    tableHTML += `</tbody></table>`;

    document.getElementById("scholarshipResults").innerHTML = tableHTML;
}
