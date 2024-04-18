-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_threadId_fkey";

-- AlterTable
ALTER TABLE "Thread" ALTER COLUMN "threadId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE SET NULL ON UPDATE CASCADE;
