<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تسجيل مستخدم جديد</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            direction: rtl;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #2c8c3c;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #2c8c3c;
            margin: 0;
            font-size: 28px;
        }
        .content {
            margin-bottom: 30px;
        }
        .user-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .user-info h3 {
            color: #2c8c3c;
            margin-top: 0;
            border-bottom: 2px solid #2c8c3c;
            padding-bottom: 10px;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        .info-label {
            font-weight: bold;
            color: #555;
        }
        .info-value {
            color: #333;
        }
        .footer {
            text-align: center;
            color: #666;
            font-size: 14px;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }
        .btn {
            display: inline-block;
            background: #2c8c3c;
            color: white;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 أكاديمية اللغات</h1>
            <p>تسجيل مستخدم جديد</p>
        </div>
        
        <div class="content">
            <p>مرحباً،</p>
            <p>تم تسجيل مستخدم جديد في أكاديمية اللغات ويحتاج إلى مراجعة وموافقة.</p>
            
            <div class="user-info">
                <h3>معلومات المستخدم</h3>
                
                <div class="info-row">
                    <span class="info-label">الاسم:</span>
                    <span class="info-value">{{ $user->name }}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">البريد الإلكتروني:</span>
                    <span class="info-value">{{ $user->email }}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">الدور:</span>
                    <span class="info-value">{{ $user->role === 'student' ? 'طالب' : ($user->role === 'teacher' ? 'مدرس' : 'إداري') }}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">تاريخ التسجيل:</span>
                    <span class="info-value">{{ $user->created_at->format('Y-m-d H:i:s') }}</span>
                </div>
                
                @if($user->student)
                    <div class="info-row">
                        <span class="info-label">رقم الطالب:</span>
                        <span class="info-value">{{ $user->student->student_id }}</span>
                    </div>
                    
                    @if($user->student->phone)
                    <div class="info-row">
                        <span class="info-label">الهاتف:</span>
                        <span class="info-value">{{ $user->student->phone }}</span>
                    </div>
                    @endif
                    
                    <div class="info-row">
                        <span class="info-label">المستوى:</span>
                        <span class="info-value">{{ $user->student->level }}</span>
                    </div>
                    
                    @if($user->student->skills)
                    <div class="info-row">
                        <span class="info-label">المهارات المطلوبة:</span>
                        <span class="info-value">{{ implode(', ', $user->student->skills) }}</span>
                    </div>
                    @endif
                @endif
                
                <div class="info-row">
                    <span class="info-label">الحالة:</span>
                    <span class="info-value">{{ $user->is_active ? 'نشط' : 'في انتظار الموافقة' }}</span>
                </div>
            </div>
            
            @if(!$user->is_active)
            <p style="background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107;">
                <strong>تنبيه:</strong> هذا المستخدم في انتظار الموافقة. يرجى مراجعة المعلومات واتخاذ الإجراء المناسب من لوحة التحكم.
            </p>
            @endif
            
            <p>يمكنك مراجعة هذا التسجيل والموافقة عليه أو رفضه من خلال لوحة التحكم.</p>
        </div>
        
        <div class="footer">
            <p>هذا البريد الإلكتروني تم إرساله تلقائياً من نظام أكاديمية اللغات</p>
            <p>© {{ date('Y') }} أكاديمية اللغات - جميع الحقوق محفوظة</p>
        </div>
    </div>
</body>
</html>