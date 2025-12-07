# Test Plan

## Strategy
Testing will cover Unit level (Backend logic), API level (Endpoints), and UI level (User interaction).

## 1. Backend API Test Cases

### TC1.1: Standard Analysis
- **Input**:
  ```json
  {
    "activities": [{"category": "Work", "minutes": 480}, {"category": "Sleep", "minutes": 480}],
    "goals": ["Work harder"]
  }
  ```
- **Expected**: 200 OK, `totalMinutes`: 960, suggestions generated.

### TC1.2: Boundary - Exact 24 Hours
- **Input**: Activities summing to 1440 minutes.
- **Expected**: 200 OK.

### TC1.3: Error - Exceed 24 Hours
- **Input**: Activities summing to 1500 minutes.
- **Expected**: 400 Bad Request, Error message "Total minutes cannot exceed 1440".

### TC1.4: Error - Negative Time
- **Input**: `{"category": "oops", "minutes": -10}`
- **Expected**: 400 Bad Request.

### TC1.5: Empty Payload
- **Input**: `{}` or `{"activities": []}`
- **Expected**: 400 Bad Request.

## 2. Manual UI Verification Steps

1. **Launch App**: Verify "Daily Activity Input" fields load.
2. **Add Rows**: Click "Add Activity" 3 times. Verify new rows appear.
3. **Validation**: Enter "Work" and "3000" minutes. Click Analyze. Verify red error toast/message.
4. **Successful Flow**: Enter valid data. Click Analyze. Verify:
   - Chart renders.
   - 3 Suggestion cards appear.
   - "Over-invested" and "Neglected" sections populate correctly.
5. **History**: Navigate to History. Verify the just-added entry appears.
