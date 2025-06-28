<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Weekly Student Registration Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #2196F3;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 0 0 5px 5px;
        }
        .report-info {
            background-color: white;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .label {
            font-weight: bold;
            color: #555;
        }
        .attachment-note {
            background-color: #e8f4f8;
            padding: 10px;
            border-left: 4px solid #2196F3;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>Weekly Student Registration Report</h2>
    </div>
    
    <div class="content">
        <p>Hello Admin,</p>
        
        <p>Please find attached the weekly student registration report for the period:</p>
        
        <div class="report-info">
            <p><span class="label">Report Period:</span> {{ $weekStart }} to {{ $weekEnd }}</p>
            <p><span class="label">Total Students:</span> {{ $totalStudents }}</p>
            <p><span class="label">Generated On:</span> {{ now()->format('F j, Y \a\t g:i A') }}</p>
        </div>
        
        <div class="attachment-note">
            <p><strong>📎 Attachment:</strong> The detailed CSV report is attached to this email containing all student registrations for the specified period.</p>
        </div>
        
        <p>The CSV file includes the following information for each student:</p>
        <ul>
            <li>Student ID</li>
            <li>Name</li>
            <li>Email Address</li>
            <li>Registration Date</li>
            <li>Phone Number</li>
            <li>Status</li>
        </ul>
        
        <p>Please review the report and let us know if you need any additional information.</p>
        
        <p>Best regards,<br>
        {{ config('app.name') }} System</p>
    </div>
</body>
</html>