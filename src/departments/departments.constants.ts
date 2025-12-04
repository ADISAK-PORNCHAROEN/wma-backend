// 1. Department Group (หัวข้อกลุ่ม)
export enum DepartmentGroup {
  BOARD = "คณะกรรมการ",
  TOP_MANAGEMENT = "ผู้บริหารระดับสูง",
  INTERNAL_AUDIT = "สำนักตรวจสอบ",
  DIRECTOR_OFFICE = "สำนักงานผู้อำนวยการ",
  DEPUTY_ADMIN = "รองผู้อำนวยการบริหาร",
  DEPUTY_TECHNICAL = "รองผู้อำนวยการวิชาการและแผน",
  DEPUTY_OPERATION = "รองผู้อำนวยการปฏิบัติการ"
}

// 2. Department Enum (เก็บลง DB เป็นภาษาอังกฤษ)
export enum Department {
  // Board
  AUDIT_COMMITTEE = "AUDIT_COMMITTEE",
  WMA_COMMITTEE = "WMA_COMMITTEE",

  // Top
  DIRECTOR = "DIRECTOR",
  ASSISTANT_DIRECTOR = "ASSISTANT_DIRECTOR",

  // Internal Audit
  INTERNAL_AUDIT = "INTERNAL_AUDIT",

  // Director Office
  CENTRAL = "CENTRAL",
  LEGAL = "LEGAL",
  PR = "PR",
  GOVERNANCE = "GOVERNANCE",

  // Deputy Admin
  ADMIN_SUPPORT = "ADMIN_SUPPORT",
  HR = "HR",
  ACCOUNTING = "ACCOUNTING",
  FINANCE = "FINANCE",
  BUDGET = "BUDGET",

  // Deputy Technical
  POLICY = "POLICY",
  RISK = "RISK",
  STATISTIC = "STATISTIC",
  ENGINEERING_STANDARD = "ENGINEERING_STANDARD",
  PROJECT_MANAGEMENT = "PROJECT_MANAGEMENT",

  // Deputy Operation
  OPERATION1_CENTER = "OPERATION1_CENTER",
  OPERATION1_BRANCH = "OPERATION1_BRANCH",
  OPERATION2_CENTER = "OPERATION2_CENTER",
  OPERATION2_BRANCH = "OPERATION2_BRANCH",
  REVENUE = "REVENUE",
  REVENUE_SYSTEM = "REVENUE_SYSTEM"
}

// 3. Department Label Map (ตัวแปลภาษาสำหรับแสดงผลหน้าเว็บ)
export const DepartmentLabel: Record<Department, string> = {
  // Board
  [Department.AUDIT_COMMITTEE]: "คณะกรรมการตรวจสอบ",
  [Department.WMA_COMMITTEE]: "คณะกรรมการองค์กรจัดการน้ำเสีย",

  // Top
  [Department.DIRECTOR]: "ผู้อำนวยการองค์การจัดการน้ำเสีย",
  [Department.ASSISTANT_DIRECTOR]: "ผู้ช่วยอำนวยการ",

  // Internal Audit
  [Department.INTERNAL_AUDIT]: "สำนักตรวจสอบภายใน",

  // Director Office
  [Department.CENTRAL]: "กองกลาง",
  [Department.LEGAL]: "กองกฎหมาย",
  [Department.PR]: "กองประชาสัมพันธ์",
  [Department.GOVERNANCE]: "กองธรรมาภิบาลและโครงการพิเศษ",

  // Deputy Admin
  [Department.ADMIN_SUPPORT]: "กองพัสดุและบริการ",
  [Department.HR]: "กองทรัพยากรบุคคล",
  [Department.ACCOUNTING]: "กองบัญชี",
  [Department.FINANCE]: "กองการเงิน",
  [Department.BUDGET]: "กองงบประมาณ",

  // Deputy Technical
  [Department.POLICY]: "กองนโยบายและแผน",
  [Department.RISK]: "กองบริหารความเสี่ยงและควบคุมภายใน",
  [Department.STATISTIC]: "กองสถิติพิเศษและประเมินผล",
  [Department.ENGINEERING_STANDARD]: "กองมาตรฐานวิศวกรรม",
  [Department.PROJECT_MANAGEMENT]: "กองพัฒนาและบริหารโครงการ",

  // Deputy Operation
  [Department.OPERATION1_CENTER]: "กองประสานงานกลาง 1",
  [Department.OPERATION1_BRANCH]: "สำนักงานจัดการน้ำเสียสาขา (ฝ่ายจัดการน้ำเสีย 1)",
  [Department.OPERATION2_CENTER]: "กองประสานงานกลาง 2",
  [Department.OPERATION2_BRANCH]: "สำนักงานจัดการน้ำเสียสาขา (ฝ่ายจัดการน้ำเสีย 2)",
  [Department.REVENUE]: "กองการจัดเก็บรายได้",
  [Department.REVENUE_SYSTEM]: "กองวิเคราะห์และพัฒนาระบบการจัดเก็บรายได้"
};

// 4. Grouped Options (สำหรับส่งไปให้ Frontend สร้าง Dropdown)
export const DEPARTMENT_OPTIONS = [
  {
    label: DepartmentGroup.BOARD,
    options: [
      { value: Department.AUDIT_COMMITTEE, label: DepartmentLabel[Department.AUDIT_COMMITTEE] },
      { value: Department.WMA_COMMITTEE, label: DepartmentLabel[Department.WMA_COMMITTEE] }
    ]
  },
  {
    label: DepartmentGroup.TOP_MANAGEMENT,
    options: [
      { value: Department.DIRECTOR, label: DepartmentLabel[Department.DIRECTOR] },
      { value: Department.ASSISTANT_DIRECTOR, label: DepartmentLabel[Department.ASSISTANT_DIRECTOR] }
    ]
  },
  {
    label: DepartmentGroup.INTERNAL_AUDIT,
    options: [
      { value: Department.INTERNAL_AUDIT, label: DepartmentLabel[Department.INTERNAL_AUDIT] }
    ]
  },
  {
    label: DepartmentGroup.DIRECTOR_OFFICE,
    options: [
      { value: Department.CENTRAL, label: DepartmentLabel[Department.CENTRAL] },
      { value: Department.LEGAL, label: DepartmentLabel[Department.LEGAL] },
      { value: Department.PR, label: DepartmentLabel[Department.PR] },
      { value: Department.GOVERNANCE, label: DepartmentLabel[Department.GOVERNANCE] }
    ]
  },
  {
    label: DepartmentGroup.DEPUTY_ADMIN,
    options: [
      { value: Department.ADMIN_SUPPORT, label: DepartmentLabel[Department.ADMIN_SUPPORT] },
      { value: Department.HR, label: DepartmentLabel[Department.HR] },
      { value: Department.ACCOUNTING, label: DepartmentLabel[Department.ACCOUNTING] },
      { value: Department.FINANCE, label: DepartmentLabel[Department.FINANCE] },
      { value: Department.BUDGET, label: DepartmentLabel[Department.BUDGET] }
    ]
  },
  {
    label: DepartmentGroup.DEPUTY_TECHNICAL,
    options: [
      { value: Department.POLICY, label: DepartmentLabel[Department.POLICY] },
      { value: Department.RISK, label: DepartmentLabel[Department.RISK] },
      { value: Department.STATISTIC, label: DepartmentLabel[Department.STATISTIC] },
      { value: Department.ENGINEERING_STANDARD, label: DepartmentLabel[Department.ENGINEERING_STANDARD] },
      { value: Department.PROJECT_MANAGEMENT, label: DepartmentLabel[Department.PROJECT_MANAGEMENT] }
    ]
  },
  {
    label: DepartmentGroup.DEPUTY_OPERATION,
    options: [
      { value: Department.OPERATION1_CENTER, label: DepartmentLabel[Department.OPERATION1_CENTER] },
      { value: Department.OPERATION1_BRANCH, label: DepartmentLabel[Department.OPERATION1_BRANCH] },
      { value: Department.OPERATION2_CENTER, label: DepartmentLabel[Department.OPERATION2_CENTER] },
      { value: Department.OPERATION2_BRANCH, label: DepartmentLabel[Department.OPERATION2_BRANCH] },
      { value: Department.REVENUE, label: DepartmentLabel[Department.REVENUE] },
      { value: Department.REVENUE_SYSTEM, label: DepartmentLabel[Department.REVENUE_SYSTEM] }
    ]
  }
];