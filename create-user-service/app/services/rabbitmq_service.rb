require 'bunny'

class RabbitmqService
  class << self
    def connection
      @connection ||= Bunny.new(ENV.fetch['RABBITMQ_HOST']).tap(&:start)
    end

    def publish_direct(message, exchange, queue)
      exchange = channel.direct(exchange)
      queue = channel.queue(queue, durable: true)
      q.bind(exchange)
      queue.publish(message.to_json)
    end

    def channel
      @channel ||= connection.create_channel
    end
  end
end
